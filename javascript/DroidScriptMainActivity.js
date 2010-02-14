// adb push Hello.js /data/data/comikit.droidscript/files/

// How to work with the emulator
// Create an SD card image:
// mksdcard 256M sdcard.iso
// Launch emulator:
// emulator -avd myavd -sdcard sdcard.iso
// Copy files to the card:
// adb push Hello.js /sdcard/Hello.js
// Set up port forwarding to the emulator:
// adb forward tcp:4042 tcp:4042
// My start script
// source gods.sh
// (alias gods='source /path/to/script')

var Server;

function print(s)
{
	var System = Packages.java.lang.System;
	System.out.println(s);
}

function startServer()
{
	var DroidScriptServer = Packages.comikit.droidscript.DroidScriptServer;
	Server = DroidScriptServer.create();
	Server.setPort(4042);
	Server.setRequestHandler(function(url, data) {
		print("URL=" + url + " DATA=" + data);
		return "Hello";
	});
	Server.startServer();
}

function stopServer()
{
	Server.stopServer();
}

function onCreate(icicle)
{
    var Widget = Packages.android.widget;
    var LayoutParams = Packages.android.view.ViewGroup.LayoutParams;
    var View = Packages.android.view.View;
    var Gravity = Packages.android.view.Gravity;
    var Intent = Packages.android.content.Intent;
    
    var script = ''
	    + 'var Widget = Packages.android.widget;\n'
	    + 'var Gravity = Packages.android.view.Gravity;\n\n'
	    + 'function onCreate(icicle) {\n'
        + '    var text = "Apps are early bound.\\n"\n'
        + '        + "The web is late bound.\\n"\n'
        + '        + "Apps are updated infrequently.\\n"\n'
        + '        + "The web updated frequently.\\n"\n'
        + '        + "JavaScript for apps means dynamics.\\n";\n'
        + '    var editor = new Widget.EditText(Activity);\n'
        + '    editor.setGravity(Gravity.TOP);\n'
        + '    editor.setText(text);\n'
        + '    Activity.setContentView(editor); }\n\n'
        + 'Widget.Toast.makeText(Activity,\n'
        + '    "Hello World! Tamejfan!",\n'
        + '    Widget.Toast.LENGTH_SHORT).show();\n'
    
    var editor = new Widget.EditText(Activity);
    editor.setLayoutParams(new Widget.LinearLayout.LayoutParams(
    		LayoutParams.FILL_PARENT, 
    		LayoutParams.WRAP_CONTENT, 
            1));
    editor.setGravity(Gravity.TOP);
    editor.setVerticalScrollBarEnabled(true);
    editor.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
    editor.setScrollContainer(true);
    editor.setText(script);
    
    var button = new Widget.Button(Activity);
    button.setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, 
            LayoutParams.WRAP_CONTENT));
    button.setText("Evaluate");
    button.setOnClickListener(function (view) { 
        Activity.eval(editor.getText().toString()); })  
        
    var button2 = new Widget.Button(Activity);
    button2.setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, 
            LayoutParams.WRAP_CONTENT));
    button2.setText("Run as Activity");
    button2.setOnClickListener(function (view) { 
        var intent = new Intent();
        intent.setClassName(Activity, "comikit.droidscript.DroidScriptActivity");
        intent.putExtra("Script", editor.getText().toString());
        Activity.startActivity(intent); })  
        
    var layout = new Widget.LinearLayout(Activity);
    layout.setOrientation(Widget.LinearLayout.VERTICAL);
    layout.setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, 
            LayoutParams.FILL_PARENT));

    layout.addView(editor);
    layout.addView(button);
    layout.addView(button2);

    Activity.setContentView(layout);
}

function onResume()
{
    print("onResume - starting server");
    //startServer();
}

function onPause()
{
    print("onPause - stopping server");
    //stopServer();
}

function onCreateOptionsMenu(menu)
{
    return true;
}

function onPrepareOptionsMenu(menu)
{
    var Menu = Packages.android.view.Menu;
    menu.clear();
    Activity.createOptionsMenuStandardItems(menu);
    menu.add(Menu.NONE, Menu.FIRST + 10, Menu.NONE, "Workspace");
    menu.add(Menu.NONE, Menu.FIRST + 11, Menu.NONE, "Comikit.se");
    menu.add(Menu.NONE, Menu.FIRST + 12, Menu.NONE, "Server");

    return true;
}

// "Satsa på onlineteknolgi istället för offlineteknologi" Göran on byggverktyg 20100201

function onOptionsItemSelected(item)
{
    var Intent = Packages.android.content.Intent;
    var Uri = Packages.android.net.Uri;
    var Menu = Packages.android.view.Menu;
    
    if ((Menu.FIRST + 10) == item.getItemId()) 
    {
//        var intent = new Intent();
//        intent.setClassName(Activity, "comikit.droidscript.RhinoDroidWorkspace");
//        Activity.startActivity(intent); 
    }
    else
    if ((Menu.FIRST + 11) == item.getItemId()) 
    {
        var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://comikit.se/"));
        Activity.startActivity(intent); 
    }
    
    return true;
}

//fun onOptionsItemSelected(item)
//    var Intent = Packages.android.content.Intent
//    var Uri = Packages.android.net.Uri
//    var Menu = Packages.android.view.Menu
//    
//    if ((Menu.FIRST + 1) == item.getItemId())
//        var intent = new Intent()
//        intent.setClassName(Activity, "comikit.rhinodroid.RhinoDroidWorkspace")
//        Activity.startActivity(intent)
//    else if ((Menu.FIRST + 2) == item.getItemId()) 
//        var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://comikit.se/"))
//        Activity.startActivity(intent)
//    
//    return true
//    