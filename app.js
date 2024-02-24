
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('table');
    const addRowBtn = document.getElementById('addRow');
    const undoBtn = document.getElementById('undo');
    const boxes = document.querySelectorAll('.box');
    const prevStateStack = [];

    boxes.forEach(box => {
      box.addEventListener('dragstart', dragStart);
      box.addEventListener('dragover', dragOver);
      box.addEventListener('drop', drop);
    });

    undoBtn.addEventListener('click', undo);
    addRowBtn.addEventListener('click', addRow);

    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      sourceBox = e.target;
      savePrevState();
      e.target.style.opacity = '0.5';
    }

    function dragOver(e) {
      e.preventDefault();
    }

  

  
    function drop(e) {
        e.preventDefault();
        const destinationBox = e.target;
        const data = e.dataTransfer.getData('text/plain');
        const sourceBox = document.getElementById(data);
    
        console.log('Source background color:', sourceBox.style.backgroundColor);
        console.log('Destination background color:', destinationBox.style.backgroundColor);
    
        if (destinationBox !== sourceBox.parentElement) {
            const tempHTML = sourceBox.innerHTML;
            const tempStyle = sourceBox.style.backgroundColor;
            sourceBox.innerHTML = destinationBox.innerHTML;
            sourceBox.style.backgroundColor = destinationBox.style.backgroundColor;
            destinationBox.innerHTML = tempHTML;
            destinationBox.style.backgroundColor = tempStyle;
        }
    
        sourceBox.style.opacity = '1';
        destinationBox.style.opacity ='1'
        savePrevState();
    }
    
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    

    function savePrevState() {
      prevStateStack.push(table.innerHTML);
    }

    function undo() {
      if (prevStateStack.length >= 2 && table.innerHTML !== undefined) {
        prevStateStack.pop(); 
        table.innerHTML = prevStateStack.pop();
        console.log(table.innerHTML);
    
        const newBoxes = document.querySelectorAll('.box');
        newBoxes.forEach(box => {
            box.addEventListener('dragstart', dragStart);
            box.addEventListener('dragover', dragOver);
            box.addEventListener('drop', drop);
        });
      }
    }
    
    
    function addRow() {
        const newRow = document.createElement('tr');
        const lastRowIndex = table.rows.length; 
        for (let i = 1; i <= 3; i++) {
            const newCell = document.createElement('td');
            const newBox = document.createElement('div');
            const boxNumber = ((lastRowIndex * 3) + i) * 100; 
            newBox.id = 'box' + boxNumber;
            newBox.classList.add('box');
            newBox.draggable = true;
            newBox.style.backgroundColor = getRandomColor();
            newBox.textContent = boxNumber;
            newBox.addEventListener('dragstart', dragStart);
            newBox.addEventListener('dragover', dragOver);
            newBox.addEventListener('drop', drop);
            newCell.appendChild(newBox);
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
        savePrevState();
    }
    
    
  });

