package comikit.droidscript;

import java.util.concurrent.atomic.AtomicReference;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

/**
 * Activity that has a JavaScript interpreter.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * License: MIT
 */
public class DroidScriptActivity extends Activity 
{
    Interpreter interpreter;
    String scriptFileName;

    public DroidScriptActivity() 
    {
        interpreter = new Interpreter(this);
    }
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Read in the script given in the intent.
        Intent intent = this.getIntent();
        if (null != intent)
        {
            String filenameOrUrl = intent.getStringExtra("ScriptName");
            if (null != filenameOrUrl) 
            {   
                setScriptFileName(filenameOrUrl);
                this.openFileOrUrl(filenameOrUrl);
            }
        }
        interpreter.callJsFunction("onCreate", savedInstanceState);
    }
    
    @Override
    public void onStart()
    {
        super.onStart();
        interpreter.callJsFunction("onStart");
    }

    @Override
    public void onRestart()
    {
        super.onRestart();
        interpreter.callJsFunction("onRestart");
    }
    
    @Override
    public void onResume()
    {
        super.onResume();
        interpreter.callJsFunction("onResume");
    }
    
    @Override
    public void onPause()
    {
        super.onPause();
        interpreter.callJsFunction("onPause");
    }
    
    @Override
    public void onStop()
    {
        super.onStop();
        interpreter.callJsFunction("onStop");
    }
    
    @Override
    public void onDestroy()
    {
        super.onDestroy();
        interpreter.callJsFunction("onDestroy");
    }
    
    @Override
    public void onCreateContextMenu(
            ContextMenu menu, 
            View view, 
            ContextMenu.ContextMenuInfo info)
    {
        interpreter.callJsFunction("onCreateContextMenu", menu, view, info);
    }

    @Override
    public boolean onContextItemSelected(MenuItem item)
    {
        interpreter.callJsFunction("onContextItemSelected", item);
        return true;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        interpreter.callJsFunction("onCreateOptionsMenu", menu);
        return true;
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu)
    {
        interpreter.callJsFunction("onPrepareOptionsMenu", menu);
        return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        if ((Menu.FIRST + 1) == item.getItemId()) 
        {
            // Reload main script.
            this.openFileOrUrl(scriptFileName);
        }
        else
        if ((Menu.FIRST + 2) == item.getItemId())
        {
            // Open Log View.
        }
        else
        {
            // Call JS handler.
            interpreter.callJsFunction("onOptionsItemSelected", item);
        }
        
        return true;
    }
    
    public void setScriptFileName(String fileName)
    {
        scriptFileName = fileName;
    }

    public void createOptionsMenuStandardItems(Menu menu)
    {
        // Add standard options.
        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Reload");
        menu.add(Menu.NONE, Menu.FIRST + 2, Menu.NONE, "View Log");
    }
    
    /**
     * Run a script in the application directory. Less useful since the user 
     * has no access to this area, better to use the SD card.
     */
    public Object openApplicationFile(final String filename)
    {
        try 
        {
            String code = DroidScriptReader.create().readStringFromApplicationFile(this, filename);
            return eval(code);
        } 
        catch (Throwable e) 
        {
            e.printStackTrace();
            reportEvalError(e);
            return e;
        }
    }
    
    /**
     * Run a script on the SD card or at an url.
     */
    public Object openFileOrUrl(final String filenameOrUrl)  {
        try 
        {
            return eval(DroidScriptReader.create().readStringFromFileOrUrl(filenameOrUrl));
        } 
        catch (Throwable e) 
        {
            e.printStackTrace();
            reportEvalError(e);
            return e;
        }
    }

    public Object eval(final String code)
    {
        final AtomicReference<Object> result = new AtomicReference<Object>(null);
        
        runOnUiThread(new Runnable() 
        {
            public void run() 
            {
                try 
                {
                    //cx = ContextFactory.getGlobal().enterContext(cx);
                    result.set(interpreter.eval(code));
                }
                catch (Throwable e)
                {
                    e.printStackTrace();
                    result.set(e);
                }
            }
        });
        
        while (null == result.get()) 
        {
            Thread.yield();
        }
        
        return result.get();
    }

    void reportEvalError(Throwable e)
    {
        new AlertDialog.Builder(this)
            .setTitle("JavaScript eval error")
            .setMessage("Exception message:\n" + e.getMessage())
            .setNeutralButton("Close", null)
            .show();
    }
    
    public static class Interpreter
    {
        Activity activity;
        Context cx;
        Scriptable scope;
        
        public Interpreter(Activity theActivity)
        {
            activity = theActivity;
            
            // Creates and enters a Context. The Context stores information
            // about the execution environment of a script.
            cx = Context.enter();
            cx.setOptimizationLevel(-1);
            
            // Initialize the standard objects (Object, Function, etc.)
            // This must be done before scripts can be executed. Returns
            // a scope object that we use in later calls.
            scope = cx.initStandardObjects();
            ScriptableObject.putProperty(scope, "Activity", Context.javaToJS(activity, scope));
        }
        
        public void exit()
        {
            Context.exit();
        }

        public Object eval(final String code)
        {
            try 
            {
                //ContextFactory.enterContext(cx);
                return cx.evaluateString(scope, code, "eval:", 1, null);
            } 
            catch (Exception e) 
            {
                e.printStackTrace();
                return e;
            }
        }
        
        public Object callJsFunction(String funName, Object... args)
        {
            Object fun = scope.get(funName, scope);
            if (fun instanceof Function) 
            {
                Log.i("DS", "Calling JsFun " + funName);
                Function f = (Function) fun;
                Object result = f.call(cx, scope, scope, args);
                return Context.toString(result);
            }
            else
            {
                Log.i("DS", "Could not find JsFun " + funName);
                return null;
            }
        }
    }
}
