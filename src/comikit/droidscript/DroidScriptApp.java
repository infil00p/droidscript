package comikit.droidscript;

import android.content.Intent;
import android.os.Bundle;

/**
 * Main activity for the application.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * Source code license: MIT
 */
public class DroidScriptApp extends DroidScriptActivity
{ 
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        installApplicationFiles();
        
        Intent intent = getIntent();
        if (null != intent)
        {
            intent.putExtra("ScriptName", "droidscript/DroidScriptApp.js");
        }
        
        super.onCreate(savedInstanceState);
    }
    
    /**
     * Use GitHub files for now.
     */
    public String[][] applicationFiles() 
    {
        String urlBase = "http://github.com/divineprog/droidscript/raw/master/";
        return 
        new String[][]
        {
            { "droidscript/DroidScript.js", urlBase + "javascript/DroidScriptApp.js" },
            { "droidscript/DroidScriptServer.js", urlBase + "javascript/DroidScriptServer.js" },
            { "droidscript/Toast.js", urlBase + "javascript/Toast.js" }
        };
    }
    
    /**
     * Install files external to the core application if they are not 
     * already installed.
     */
    public void installApplicationFiles()
    {
        try
        {
            DroidScriptFileHandler handler = DroidScriptFileHandler.create(); 
            for (String[] entry : applicationFiles())
            {
                if (!handler.externalStorageFileExists(entry[0])) 
                {
                    handler.installFile(entry[0], entry[1]);   
                }
            }
        } 
        catch (Exception e)
        {
            DroidScript.log("Error in installApplicationFiles: " + e.toString());
            e.printStackTrace();
        }
    }
    
    /**
     * Update (overwrite) external application files.
     * This will overwrite user modifications to these files.
     */
    public void updateApplicationFiles()
    {
        try
        {
            DroidScriptFileHandler handler = DroidScriptFileHandler.create();
            for (String[] entry : applicationFiles())
            {
                handler.installFile(entry[0], entry[1]);
            }
        } 
        catch (Exception e)
        {
            DroidScript.log("Error in updateApplicationFiles: " + e.toString());
            e.printStackTrace();
        }
    }
}
