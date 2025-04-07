// Fetch and display activities
async function fetchActivities() {
    try {
        const response = await fetch('/activities');
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        const activities = await response.json();
        const activitiesList = document.getElementById('activities-list');
        activitiesList.innerHTML = '';

        for (const [name, details] of Object.entries(activities)) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${name}</strong>: ${details.description} <br>
                Schedule: ${details.schedule} <br>
                Participants: ${details.participants.length}/${details.max_participants} <br>
                <div>
                    <strong>Signed-up Participants:</strong>
                    <ul>
                        ${details.participants.map(participant => `<li>${participant}</li>`).join('')}
                    </ul>
                </div>
            `;
            activitiesList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchActivities();
});
