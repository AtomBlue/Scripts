function importFromEmail() {
  try {
    // Format today's date in Eastern Time
    var date = Utilities.formatDate(new Date(), "America/New_York", "yyyy-MM-dd");

    // Build Gmail search query for today's email
    var searchQuery = 'subject: SUBJECT GOES HERE' + date;
    var threads = GmailApp.search(searchQuery);

    // Stop if no matching threads found or thread is undefined
    if (threads.length === 0 || !threads[0]) {
      Logger.log("No matching or usable thread found.");
      return;
    }

    // Get messages from the first thread
    var messages = threads[0].getMessages();

    // If there are no messages, log and exit
    if (messages.length === 0) {
      Logger.log("Thread contains no messages.");
      return;
    }

    // Get the last message’s first attachment
    var attachment = messages[messages.length - 1].getAttachments()[0];

    // Get the file name and confirm it's a CSV
    var filename = attachment.getName();
    if (filename.toLowerCase().endsWith(".csv")) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TAB NAME HERE');
      var csvData = Utilities.parseCsv(attachment.getDataAsString(), ",");

      // Clear columns A to Z
      sheet.getRange('A:Z').clear({ contentsOnly: true });

      // ✅ Move email to trash BEFORE writing to sheet
      threads[0].moveToTrash();

      // ✅ Paste data to sheet
      sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);

      Logger.log("Import successful. Rows imported: " + csvData.length);
    } else {
      Logger.log("Attachment is not a CSV. Name: " + filename + ", Type: " + attachment.getContentType());
    }

  } catch (e) {
    // Catch unexpected errors and log instead of failing the script
    Logger.log("Error during importFromEmail(): " + e.message);
  }
}
