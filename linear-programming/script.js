async function UpdateInputTable() {
    let variables = document.getElementById('inVariables').value.trim();
    let properties = document.getElementById('inProperties').value.trim();

    if (!variables || !properties) {
        document.getElementById('tblInput').innerHTML = '<thead><tr><th>Variables</th><th>Property 1</th><th>Property 2</th></tr></thead><tbody><tr><th>Variable 1</th><td></td><td></td></tr><tr><th>Variable 2</th><td></td><td></td></tr></tbody>';
        document.querySelector('#tblConstraints tbody').innerHTML = '<tr><td>Property 1</td><td><select class="form-select"><option value="min">None</option><option value="min">Minimum</option><option value="max">Maximum</option><option value="equal">Equal</option></select></td><td></td></tr>';
        document.getElementById('inOptimize').innerHTML = '<option>Property 1</option><option>Property 2</option>';
        return;
    }

    variables = variables.split('\n').map(value => value.trim());
    properties = properties.split('\n').map(value => value.trim());

    document.getElementById('tblInput').innerHTML = 
    `<thead>
        <tr>
            <th>Variables</th>${properties.map(property => `<th>${property}</th>`).join('')}
        </tr>
    </thead>
    <tbody>
        ${variables.map(variable => `<tr><th>${variable}</th>${properties.map(p => '<td contenteditable="true"></td>').join('')}</tr>`)}
    </tbody>`;

    let constraintSelect = 
    `<select class="form-select">
        <option value="none">None</option>
        <option value="min">Minimum</option>
        <option value="max">Maximum</option>
        <option value="equal">Equal</option>
    </select>`;

    document.querySelector('#tblConstraints tbody').innerHTML = properties.map(property => `<tr><td>${property}</td><td>${constraintSelect}</td><td contenteditable="true"></td></tr>`).join('');

    document.getElementById('inOptimize').innerHTML = properties.map(property => `<option>${property}</option>`).join('');

}

async function Solve() {
    let variables = {};
    let properties = Array.from(document.querySelectorAll('#tblInput thead th')).map(th => th.innerHTML);
    
    let trs = document.querySelectorAll('#tblInput tbody tr');
    for (let tr of trs) {
        let name = tr.cells[0].innerHTML;
        let variable = {};  
        for (let i = 1; i < properties.length; i++) {
            let value = tr.cells[i].innerHTML.trim() * 1;
            if (!value || isNaN(value)) { return; }
            variable[properties[i]] = value;
        }
        variables[name] = variable;
    }
    
    let constraints = {};
    trs = document.querySelectorAll('#tblConstraints tbody tr');
    for (let tr of trs) {
        let name = tr.cells[0].innerHTML;
        let cons = tr.cells[1].querySelector('select').value;
        let value = tr.cells[2].innerHTML.trim() * 1    ;
        if (cons != 'none') {
            if (!value || isNaN(value)) { return; }
            let constraint = {};
            constraint[cons] = value;
            constraints[name] = constraint;
        }
    }
    
    let model = {
        optimize: document.getElementById('inOptimize').value,
        opType: document.getElementById('inOpType').value,
        variables: variables,
        constraints: constraints
    };
    console.log(model);

    let solution = solver.Solve(model);

    document.getElementById('output').innerHTML = JSON.stringify(solution, null, 4);    
}