// TalkSpace functionality
document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('createPostBtn');
    const modal = document.getElementById('createPostModal');
    const closeModal = document.querySelector('.close-modal');
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    // Open modal
    createPostBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle post submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        // Create new post
        const post = createPost({
            title,
            content,
            user: generateAnonymousName(),
            time: 'Just now'
        });
        
        // Add post to container
        postsContainer.insertBefore(post, postsContainer.firstChild);
        
        // Reset form and close modal
        postForm.reset();
        modal.classList.remove('active');
    });

    // Handle post actions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) {
            const btn = e.target.closest('.action-btn');
            const icon = btn.querySelector('i');
            const count = btn.querySelector('span');
            
            if (icon.classList.contains('lucide-heart')) {
                const currentLikes = parseInt(count.textContent);
                count.textContent = btn.classList.toggle('liked') ? currentLikes + 1 : currentLikes - 1;
            }
        }
    });
});

// Create new post element
function createPost({ title, content, user, time }) {
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <div class="post-header">
            <span class="anonymous-user">${user}</span>
            <span class="post-time">${time}</span>
        </div>
        <h3 class="post-title">${title}</h3>
        <p class="post-content">${content}</p>
        <div class="post-actions">
            <button class="action-btn">
                <i class="lucide-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn">
                <i class="lucide-message-circle"></i>
                <span>0 replies</span>
            </button>
        </div>
    `;
    return post;
}

// Generate random anonymous name
function generateAnonymousName() {
    const animals = ['Panda', 'Fox', 'Owl', 'Lion', 'Wolf', 'Bear', 'Tiger', 'Eagle'];
    return 'Anonymous ' + animals[Math.floor(Math.random() * animals.length)];
}