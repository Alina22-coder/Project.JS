const form = document.createElement('form');
form.className = 'form';

// ===========================GROUP=================================
const inputGroup = document.createElement('div');
inputGroup.className = 'input-group';

const labelNameValuePair = document.createElement('label');
labelNameValuePair.className = 'label';
labelNameValuePair.textContent = 'Name/Value Pair';

const inputNameValue = document.createElement('input');
inputNameValue.className = 'input-name';
inputNameValue.type = 'text';
inputNameValue.id = 'input-name-value';

labelNameValuePair.append(inputNameValue);

const addBtn = document.createElement('button');
addBtn.className = 'add-btn';
addBtn.type = 'button';
addBtn.innerText = 'Add';

inputGroup.append(labelNameValuePair, addBtn);

// ===========================LIST=================================
const inputList = document.createElement('div');
inputList.className = 'input-list';

const nameValuePairList = document.createElement('div');
nameValuePairList.className = 'name-value-pair';
nameValuePairList.innerText = 'Name/Value Pair List';

const nameValueList = document.createElement('ul');
nameValueList.className = 'input-name-list';
nameValueList.id = 'input-name-value-list';

nameValuePairList.append(nameValueList)

const buttons = document.createElement('div');
buttons.className = 'buttons';

const sortByNameBtn = document.createElement('button');
sortByNameBtn.className = 'sort-name-btn';
sortByNameBtn.type = 'button';
sortByNameBtn.innerText = 'Sort by Name';

const sortByValueBtn = document.createElement('button');
sortByValueBtn.className = 'sort-value-btn';
sortByValueBtn.type = 'button';
sortByValueBtn.innerText = 'Sort by Value';

const deleteBtn = document.createElement('button');
deleteBtn.className = 'delete-btn';
deleteBtn.type = 'button';
deleteBtn.innerText = 'Delete';

buttons.append(sortByNameBtn,sortByValueBtn, deleteBtn);

inputList.append(nameValuePairList,buttons)


form.append(inputGroup,inputList);
document.body.appendChild(form);

// ===========================LOGIC=================================
addBtn.addEventListener('click', function() {
    const inputValue = inputNameValue.value.trim();
    if (isValidNameValue(inputValue)) {
        const [name, value] = inputValue.split('=').map(element => element.trim());
        const listItem = document.createElement('li');
        listItem.textContent = `${name} = ${value}`;

        listItem.addEventListener('click', function () {
            listItem.classList.toggle('selected');
        });

        nameValueList.appendChild(listItem);
        inputNameValue.value = '';
    } else {
        alert('Invalid Name/Value pair format. Please use <name> = <value>.');
    }
})

function isValidNameValue(input) {
    const regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;
    return regex.test(input);
}

sortByNameBtn.addEventListener('click', function() {
    const items = Array.from(nameValueList.children);
    items.sort((a, b) => {
        const nameA = a.textContent.split('=')[0].trim();
        const nameB = b.textContent.split('=')[0].trim();
        return nameA.localeCompare(nameB);
    });
    nameValueList.innerHTML = '';
    items.forEach(item => nameValueList.appendChild(item));
});

sortByValueBtn.addEventListener('click', function() {
    const items = Array.from(nameValueList.children);
    items.sort((a, b) => {
        const valueA = a.textContent.split('=')[1].trim();
        const valueB = b.textContent.split('=')[1].trim();
        return valueA.localeCompare(valueB);
    });
    nameValueList.innerHTML = '';
    items.forEach(item => nameValueList.appendChild(item));
});

deleteBtn.addEventListener('click', function() {
    const selectedItems = Array.from(nameValueList.querySelectorAll('li.selected'));
    selectedItems.forEach(item => item.remove());

});


