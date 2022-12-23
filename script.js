var increment = 5;

function amountTocoins(amount, coins) {
    if (amount <= 0) {
        return [];
    }
    else {
        if (amount >= coins[0]) {
            left = (amount - coins[0]);
            return [coins[0]].concat(amountTocoins(left, coins));
        }
        else {
            coins.shift();
            return amountTocoins(amount, coins);
        }
    }
}

function create_workout(workout, exercise) {
    if (exercise) {


        const body = document.body;

        var y = document.createElement("h3");
        var percent_of_body_weight = Math.round(one_rep_max[exercise] / my_weight * 100);
        var target_1RM = Math.round(goals[exercise] * my_weight)
        var t = document.createTextNode(exercise + ' - ' + one_rep_max[exercise] + ' 1RM (' + percent_of_body_weight + '%) Goal ' + target_1RM);
        body.appendChild(y).appendChild(t);


        const tbl = document.createElement('table');
        tbl.setAttribute('class', 'table');

        const dropset = workout[workout.length - 1]

        var reps_needed_to_pr;
        var theoretical_max;

        for (const element of workout) {
            if (element !== dropset) {
                const tr = tbl.insertRow();
                const td = tr.insertCell();

                var training_max = one_rep_max[exercise] * 0.9;
                var weight = Math.ceil(element['%'] * training_max / increment) * increment;

                td.appendChild(document.createTextNode(weight));


                const reps = tr.insertCell();
                var rep = element['reps'];
                reps.appendChild(document.createTextNode(rep));

                const weight_breakdown = tr.insertCell();
                var split = weight - 45;
                var rounded_split = Math.ceil(split / increment) * increment / 2;
                var plates = amountTocoins(rounded_split, [45, 25, 10, 5, 2.5])
                weight_breakdown.appendChild(document.createTextNode(plates.join(', ')));

                reps_needed_to_pr = rep;
                var theoretical_max = OneRepMax(weight, reps_needed_to_pr);
                while (theoretical_max <= one_rep_max[exercise]) {
                    reps_needed_to_pr += 1;
                    theoretical_max = OneRepMax(weight, reps_needed_to_pr);
                }
            }


        }

        const head = tbl.createTHead();
        const thead = head.insertRow();

        var header = ['lb', 'reps', 'plates']
        for (const header_element of header) {

            th = thead.insertCell();
            th.appendChild(document.createTextNode(header_element));
            th.setAttribute('scope', 'col')
        }


        body.appendChild(tbl);

        var a = document.createElement("h6");
        a.style = "width:100px;height:24px;text-align: center;margin-top: 16px;    "
        var b = document.createTextNode(String(reps_needed_to_pr) + ' PR (' + String(theoretical_max) + ')');
        var div = document.createElement("div");
        var c = document.createElement("button");
        c.className = "btn btn-primary btn-lg";
        c.value = 5
        c.sets = "true"
        c.onclick = function onClick() {
            this.value -= 1;
            this.innerHTML = this.value + " Dropsets Remaining";
            if (this.value <= 0) {
                this.style.display = "none"
            }
        };
        c.id = "clicks";
        c.innerHTML = "5 Dropsets Remaining";
        c.style = "touch-action: manipulation;"
        div.style = "display: flex; "

        div.appendChild(a).appendChild(b);
        div.appendChild(c);
        body.appendChild(div);



        const tbl2 = document.createElement('table');
        tbl2.setAttribute('class', 'table');


        for (let index = 0; index < 1; index++) {
            const element = dropset

            const tr = tbl2.insertRow();
            const td = tr.insertCell();

            var training_max = one_rep_max[exercise] * 0.9;
            var weight = Math.ceil(element['%'] * training_max / increment) * increment;

            td.appendChild(document.createTextNode(weight));


            const reps = tr.insertCell();
            reps.appendChild(document.createTextNode(element['reps']));

            const weight_breakdown = tr.insertCell();
            var split = weight - 45;
            var rounded_split = Math.ceil(split / increment) * increment / 2;
            var plates = amountTocoins(rounded_split, [45, 25, 10, 5, 2.5])
            weight_breakdown.appendChild(document.createTextNode(plates.join(', ')));


        }
        const head2 = tbl2.createTHead();
        const thead2 = head2.insertRow();

        var header = ['lb', 'reps', 'plates']
        for (const header_element of header) {

            th = thead2.insertCell();
            th.appendChild(document.createTextNode(header_element));
            th.setAttribute('scope', 'col')
        }



        body.appendChild(tbl2);

    }
}

function OneRepMax(weight, reps) {
    return Math.round(weight / (1.0278 - 0.0278 * reps));
}

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);

var week_in_cycle = Math.floor(day / exercise_by_day.length) % 3;
var day_of_cycle = day % exercise_by_day.length

console.log('Week in Cycle: ' + week_in_cycle)

var workout = workout_by_week[week_in_cycle]
var exercise = exercise_by_day[day_of_cycle]

create_workout(workout, exercise);
