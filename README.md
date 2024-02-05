# yt-playlistr

This project is a simple webpage and JavaScript application that allows users to search YouTube videos based on the text input in a textarea. Each row of the textarea is treated as a separate search query. When clicking "Search", the top result for each row is displayed with a thumbnail and a link to the video. The search results can be converted into an anonymous playlist, but unfortunately this playlist cannot be saved (though you can share the URL).

## Usage

Enter your search queries in the textarea, one per line. Click the "Search" button to perform the search. The results will be displayed below. Clicking "Create Playlist" converts the results into an anonymous playlist which opens in a new tab.

## Dependencies

This project uses the YouTube Data API. You will need to obtain an API key from the Google Cloud Console and create a `config.js` file where you store it as `const YOUTUBE_API_KEY = 'abc123'`.

## License

This project is licensed under the MIT License.