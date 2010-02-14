package comikit.droidscript;

import android.os.Bundle;
import android.util.Log;

/**
 * Activity that starts an http server for live (hot-linked) 
 * programming via a web browser or another client.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * License: MIT
 */
public class DroidScriptLiveActivity extends DroidScriptActivity
{ 
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        Log.i("RD", "Open DroidScript.js");
        openApplicationFile("DroidScriptLiveActivity.js");
        super.onCreate(savedInstanceState);
    }
}
