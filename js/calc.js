const previousOperationText = document.getElementById("previousOperation")
const currentOperationText = document.getElementById("currentOperation")
const buttons = document.querySelectorAll("#buttonsContainer button")


class calculadora{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adiciona os valores na tela
    addDigit(digit){
        // Verificar se existe o ponto na tela
        if(digit === "." && this.currentOperationText.innerHTML.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }

    // Processar
    processOperation(operation){
        if(this.currentOperationText.innerHTML === "" && operation !== "CE" ){
            if(this.previousOperationText.innerHTML != "" ){
                this.chanceOperation(operation)
            }
            return;
        }

        let operationValue;
        const previous = Number(this.previousOperationText.innerHTML.split(" ")[0])
        const current = Number(this.currentOperationText.innerHTML)

            switch(operation){
                case "+":
                    operationValue = previous + current;
                    this.updateScreen(operationValue,operation,current, previous)
                    break;
                case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue,operation,current, previous)
                    break;
                case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue,operation,current, previous)
                    break;
                case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue,operation,current, previous)
                    break;
                case "DEL":
                    this.processDelOperator()
                    break;
                case "C" :
                    this.processClearCurrentOperation()
                    break;
                case "CE":
                    this.processDelete()
                    break;
                case "=":
                    this.processEqual();
                    break;
                default:
                    return;
            }       
    }

    // Aualizar valores
    updateScreen(
        operationValue = null,
        operation = null,
        current = null, 
        previous = null) {

            console.log(operationValue,operation,current,previous)

            if(operationValue === null){
                this.currentOperationText.innerHTML += this.currentOperation 
            } else {
                if(previous === 0){
                    operationValue = current;
                }

                this.previousOperationText.innerHTML = `${operationValue} ${operation}` 
                this.currentOperationText.innerHTML = ""
            }
            
    }

    chanceOperation(operation) {
        const mathOperation = ["/","*","+","-"]

        if(!mathOperation.includes(operation)){
            return
        }

        this.previousOperationText.innerHTML = this.previousOperationText.innerHTML.slice(0,-1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerHTML = this.currentOperationText.innerHTML.slice(0, -1)
    }

    processClearCurrentOperation() {
        this.currentOperationText.innerHTML = "";
    }

    processDelete() {
        this.currentOperationText.innerHTML = "";
        this.previousOperationText.innerHTML = "";
    }

    processEqual() {
        const operation = previousOperationText.innerHTML.split(" ")[1]

        this.processOperation(operation)
    }
}

const calc = new calculadora(previousOperationText,currentOperationText)

buttons.forEach((bt) => {
    bt.addEventListener("click",(ev) => {
        const value = ev.target.innerHTML;

       if(parseInt(value) >= 0 || value == "."){
            calc.addDigit(value)
       } else {
            calc.processOperation(value)

       }
    })

})
 

