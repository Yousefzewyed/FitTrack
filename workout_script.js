<script>
    function generateSampleWorkout(numDays, userGoal, userLevel) {
        const workoutDays = [];
        const dayNames = {
            3: ['Day 1 - Push', 'Day 2 - Pull', 'Day 3 - Legs'],
            4: ['Day 1 - Upper Push', 'Day 2 - Lower Body', 'Day 3 - Upper Pull', 'Day 4 - Full Body'],
            5: ['Day 1 - Chest', 'Day 2 - Back', 'Day 3 - Legs', 'Day 4 - Shoulders', 'Day 5 - Arms'],
            6: ['Day 1 - Chest', 'Day 2 - Back', 'Day 3 - Legs', 'Day 4 - Shoulders', 'Day 5 - Arms', 'Day 6 - Full Body']
        };

        const exercises = {
            'Lose Weight': [
                { name: 'Burpees', equipment: 'Bodyweight', muscle_group: 'Full Body', sets: 3, reps: '10-15', rest: '30s' },
                { name: 'Mountain Climbers', equipment: 'Bodyweight', muscle_group: 'Core', sets: 3, reps: '20-30', rest: '30s' },
                { name: 'Jump Squats', equipment: 'Bodyweight', muscle_group: 'Legs', sets: 4, reps: '12-15', rest: '45s' },
                { name: 'Push-ups', equipment: 'Bodyweight', muscle_group: 'Chest', sets: 3, reps: '10-15', rest: '60s' },
                { name: 'Plank', equipment: 'Bodyweight', muscle_group: 'Core', sets: 3, reps: '30-60s', rest: '30s' }
            ],
            'Build Muscle': [
                { name: 'Bench Press', equipment: 'Barbell', muscle_group: 'Chest', sets: 4, reps: '8-12', rest: '90s' },
                { name: 'Bent Over Rows', equipment: 'Barbell', muscle_group: 'Back', sets: 4, reps: '8-12', rest: '90s' },
                { name: 'Squats', equipment: 'Barbell', muscle_group: 'Quads', sets: 4, reps: '8-10', rest: '120s' },
                { name: 'Shoulder Press', equipment: 'Dumbbells', muscle_group: 'Shoulders', sets: 3, reps: '10-12', rest: '60s' },
                { name: 'Bicep Curls', equipment: 'Dumbbells', muscle_group: 'Biceps', sets: 3, reps: '12-15', rest: '60s' }
            ],
            'Get Stronger': [
                { name: 'Deadlift', equipment: 'Barbell', muscle_group: 'Full Body', sets: 5, reps: '3-5', rest: '180s' },
                { name: 'Bench Press', equipment: 'Barbell', muscle_group: 'Chest', sets: 5, reps: '3-5', rest: '180s' },
                { name: 'Squats', equipment: 'Barbell', muscle_group: 'Quads', sets: 5, reps: '3-5', rest: '180s' },
                { name: 'Overhead Press', equipment: 'Barbell', muscle_group: 'Shoulders', sets: 4, reps: '4-6', rest: '120s' },
                { name: 'Pull-ups', equipment: 'Bodyweight', muscle_group: 'Back', sets: 4, reps: '6-8', rest: '90s' }
            ]
        };

        const selectedExercises = exercises[userGoal] || exercises['Build Muscle'];
        const dayTitles = dayNames[parseInt(numDays)] || dayNames[3];

        for (let i = 0; i < parseInt(numDays); i++) {
            workoutDays.push({
                day_title: dayTitles[i] || `Day ${i + 1}`,
                total_exercises: 5,
                exercises: selectedExercises.slice(0, 5)
            });
        }

        return { days: workoutDays };
    }

    document.getElementById('ai-workout-form').addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData(this);
        const days = formData.get('days');
        const goal = formData.get('goal');
        const level = formData.get('level');

        const summaryText = `${days} Days • ${goal} • ${level}`;

        const resultContainer = document.getElementById('result-container');
        const apiResponseDiv = document.getElementById('api-response');

        resultContainer.style.display = 'block';
        apiResponseDiv.innerHTML = '';

        const workoutData = generateSampleWorkout(days, goal, level);
        renderWorkoutUI(workoutData, summaryText, apiResponseDiv);
    });

    function validateForm() {
        const form = document.getElementById('ai-workout-form');
        const days = form.querySelector('input[name="days"]:checked');
        const goal = form.querySelector('input[name="goal"]:checked');
        const level = form.querySelector('input[name="level"]:checked');

        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;

        if (!days) {
            showError('Please select how many days per week you want to train.', form.querySelector('.question-group:nth-child(1)'));
            isValid = false;
        }

        if (!goal) {
            showError('Please select your main fitness goal.', form.querySelector('.question-group:nth-child(2)'));
            isValid = false;
        }

        if (!level) {
            showError('Please select your experience level.', form.querySelector('.question-group:nth-child(3)'));
            isValid = false;
        }

        return isValid;
    }

    function showError(message, targetElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.padding = '8px';
        errorDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        errorDiv.style.borderRadius = '4px';
        errorDiv.textContent = message;
        targetElement.appendChild(errorDiv);
    }

    function renderWorkoutUI(data, summaryText, container) {
        container.innerHTML = '';

        let html = `
            <div class="workout-plan-container">
                <div class="plan-header-top">
                    <h2>✨ Your Personalized Workout Plan</h2>
                    <div class="plan-summary-badge">${summaryText}</div>
                </div>
        `;

        if (data.days && Array.isArray(data.days)) {
            data.days.forEach(day => {
                html += `
                    <div class="day-card">
                        <div class="day-header">
                            <div class="day-title">${day.day_title}</div>
                            <div class="ex-count">⏱️ ${day.total_exercises} exercises</div>
                        </div>

                        <div class="workout-grid">
                            <div class="grid-header">Exercise</div>
                            <div class="grid-header">Equipment</div>
                            <div class="grid-header">Muscle Group</div>
                            <div class="grid-header">Sets</div>
                            <div class="grid-header">Reps</div>
                            <div class="grid-header">Rest</div>
                `;

                if (day.exercises && Array.isArray(day.exercises)) {
                    day.exercises.forEach(ex => {
                        html += `
                            <div class="grid-row">
                                <div class="grid-cell cell-exercise">
                                    <div class="ex-icon">🏋️</div>
                                    ${ex.name}
                                </div>
                                <div class="grid-cell">${ex.equipment}</div>
                                <div class="grid-cell"><span class="muscle-badge">${ex.muscle_group}</span></div>
                                <div class="grid-cell cell-center">${ex.sets}</div>
                                <div class="grid-cell cell-center">${ex.reps}</div>
                                <div class="grid-cell cell-center">${ex.rest}</div>
                            </div>
                        `;
                    });
                }

                html += `
                        </div>
                    </div>
                `;
            });
        } else {
            html += `<p style="color: red;">The data returned is not in the correct format.</p>`;
        }

        html += `</div>`;
        container.innerHTML = html;
    }
</script>
