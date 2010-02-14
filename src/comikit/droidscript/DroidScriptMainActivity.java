package comikit.droidscript;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

/**
 * Main activity for the application.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * License: MIT
 */
public class DroidScriptMainActivity extends DroidScriptActivity
{ 
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        Intent intent = getIntent();
        if (null != intent)
        {
            intent.putExtra("ScriptName", "droidscript/DroidScriptMainActivity.js");
        }
        super.onCreate(savedInstanceState);
    }
}

//      
//      
//    @Override
//    public void onCreate(Bundle savedInstanceState)
//    {
//        super.onCreate(savedInstanceState);
//        
//        // Create UI
//        Button button = new Button(this);
//        button.setBackgroundColor(Color.WHITE);
//        setContentView(button);
//        registerForContextMenu(button);
//        
//        // Button Start Server
//        
//        // Button Workspace
//        
//        // Button Playfield
//    }
//
//    @Override
//    public void onCreateContextMenu(
//            ContextMenu menu, 
//            View view, 
//            ContextMenu.ContextMenuInfo info)
//    {
//        MenuItem item = menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Workspace");
//        //item.setIntent(intent);
//        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Playfield");
//        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Server");
//    }
//
//    @Override
//    public boolean onContextItemSelected(MenuItem item)
//    {
//        startActivity(new Intent(this, RhinoDroidWorkspace.class));
//        return true;
//    }
//
//    @Override
//    public boolean onCreateOptionsMenu(Menu menu)
//    {
//        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Workspace");
//        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Playfield");
//        menu.add(Menu.NONE, Menu.FIRST + 1, Menu.NONE, "Server");
//        
//        return true;
//    }
//
//    @Override
//    public boolean onOptionsItemSelected(MenuItem item)
//    {
//        startActivity(new Intent(this, RhinoDroidWorkspace.class));
//        return true;
//    }

