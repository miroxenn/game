// Get the modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("close-modal")[0];

// Function to open modal
function openModal(imgSrc) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

// Close modal when clicking the X
closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Music Player Functionality
function togglePlay(audioId) {
    const audio = document.getElementById(audioId);
    const playBtn = audio.parentElement.querySelector('.play-btn i');
    
    if (audio.paused) {
        // Stop all other audio
        document.querySelectorAll('audio').forEach(a => {
            if (a.id !== audioId) {
                a.pause();
                a.parentElement.querySelector('.play-btn i').className = 'ri-play-fill';
            }
        });
        
        // Play the selected audio
        audio.play().catch(error => {
            console.log("Playback failed:", error);
        });
        playBtn.className = 'ri-pause-fill';
    } else {
        audio.pause();
        playBtn.className = 'ri-play-fill';
    }
}

// Update progress bar and time
document.querySelectorAll('audio').forEach(audio => {
    // Handle time updates
    audio.addEventListener('timeupdate', function() {
        const progress = this.parentElement.querySelector('.progress');
        const timeDisplay = this.parentElement.querySelector('.time');
        const percent = (this.currentTime / this.duration) * 100;
        progress.style.width = percent + '%';
        
        // Update time display
        const currentMinutes = Math.floor(this.currentTime / 60);
        const currentSeconds = Math.floor(this.currentTime % 60);
        const durationMinutes = Math.floor(this.duration / 60);
        const durationSeconds = Math.floor(this.duration % 60);
        
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    });
    
    // Handle audio end
    audio.addEventListener('ended', function() {
        const playBtn = this.parentElement.querySelector('.play-btn i');
        playBtn.className = 'ri-play-fill';
        this.currentTime = 0;
    });

    // Handle play/pause state changes
    audio.addEventListener('play', function() {
        const playBtn = this.parentElement.querySelector('.play-btn i');
        playBtn.className = 'ri-pause-fill';
    });

    audio.addEventListener('pause', function() {
        const playBtn = this.parentElement.querySelector('.play-btn i');
        playBtn.className = 'ri-play-fill';
    });
});

// Click on progress bar to seek
document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.addEventListener('click', function(e) {
        const audio = this.parentElement.parentElement.querySelector('audio');
        const percent = e.offsetX / this.offsetWidth;
        audio.currentTime = percent * audio.duration;
    });
});

