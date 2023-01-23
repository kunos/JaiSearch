// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jaigo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jaigo.jaiSearch', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from JaiGo yaya!');

		//var selection = vscode.window.activeTextEditor?.selection;

		var editor = vscode.window.activeTextEditor;

		var documentFilename = vscode.window.activeTextEditor?.document.fileName;
		var selection = editor?.selection;

		let word = editor?.document.getWordRangeAtPosition(editor.selection.active);
		//var selectedText = vscode.window.activeTextEditor?.document.getText(selection);

		var selectedText = vscode.window.activeTextEditor?.document.getText(word);


		if (selectedText && selectedText.length > 0 && word?.isSingleLine) {
			var jaiSymbol = selectedText + " ::";
			var message = "JaiSearch: " + jaiSymbol;

			// Initiate search
			vscode.commands.executeCommand('workbench.action.findInFiles', {
				query: jaiSymbol,
				triggerSearch: true,
				matchWholeWord: true,
				isCaseSensitive: true,
			});

			vscode.window.showInformationMessage(message);
		} else {
			vscode.window.showInformationMessage("JaiSearch: No selection");
		}

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
