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
    
    var view = new Widget.TextView(Activity);
    var text = 'fsdfsdfsdf2010-01-31 Hello Android!\nThis is JavaScript in action!';
    text += 'The web is late bound';
    text += 'Apps are early bound';
    text += 'Web pages are updated frequently';
    text += 'Apps are updated infrequently';
    text += 'Web pages are dynamic';
    text += 'Apps are static';
    view.setText(text);
    
    var editor = new Widget.EditText(Activity);
    editor.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
    //editor.setLines(10);
    editor.setGravity(Gravity.TOP);
    editor.setVerticalScrollBarEnabled(true);
    editor.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
    editor.setScrollContainer(true);
    editor.setText(text);
        
    Activity.setContentView(editor);
}

function onResume()
{
	print("onResume - starting server");
	startServer();
}

function onPause()
{
	print("onPause - stopping server");
	stopServer();
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

// "Satsa på onlineteknolgi istället för offlineteknologi" Göran on byggverktyg 100201

function onOptionsItemSelected(item)
{
	var Intent = Packages.android.content.Intent;
	var Uri = Packages.android.net.Uri;
	var Menu = Packages.android.view.Menu;
	
	if ((Menu.FIRST + 10) == item.getItemId()) 
	{
		var intent = new Intent();
	    intent.setClassName(Activity, "comikit.droidscript.RhinoDroidWorkspace");
	    Activity.startActivity(intent); 
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
//	var Intent = Packages.android.content.Intent
//	var Uri = Packages.android.net.Uri
//	var Menu = Packages.android.view.Menu
//	
//	if ((Menu.FIRST + 1) == item.getItemId())
//		var intent = new Intent()
//	    intent.setClassName(Activity, "comikit.rhinodroid.RhinoDroidWorkspace")
//	    Activity.startActivity(intent)
//	else if ((Menu.FIRST + 2) == item.getItemId()) 
//		var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://comikit.se/"))
//		Activity.startActivity(intent)
//    
//	return true
//	