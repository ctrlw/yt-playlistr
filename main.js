// Get HTML elements
const textArea = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const createPlaylistButton = document.getElementById('createPlaylistButton');
const resultsSection = document.getElementById('results');

// Add event listener to search button
searchButton.addEventListener('click', async () => {
    // Get text from textarea and split into rows
    const rows = textArea.value.trim().split('\n');

    // Clear previous results
    resultsSection.innerHTML = '';

    // Perform a search for each row and store promises in an array
    const searchPromises = rows.map(row => searchYouTube(row));

    // Wait for all search promises to resolve
    const allResults = await Promise.all(searchPromises);

    // Display each result
    allResults.forEach(results => {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result-row'); // Add class
            resultElement.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${result.videoId}">
                    <img src="${result.thumbnail}" alt="${result.title}">
                </a>
                <a href="https://www.youtube.com/watch?v=${result.videoId}">
                    <span>${result.title}</span>
                </a>
            `;
            resultsSection.appendChild(resultElement);
        });
    });
});

// Add event listener to create playlist button
createPlaylistButton.addEventListener('click', () => {
    // Get all result elements
    const resultElements = resultsSection.querySelectorAll('div');

    // Extract video IDs from result elements
    const videoIds = Array.from(resultElements).map(resultElement => {
        const videoUrl = resultElement.querySelector('a').href;
        const videoId = videoUrl.split('=')[1];
        return videoId;
    });

    // Create YouTube playlist link
    const playlistLink = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;

    // Open playlist link in new tab
    window.open(playlistLink, '_blank');
});

async function searchYouTube(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();

        return data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url
        }));
    } catch (error) {
        console.error(error);
    }
}