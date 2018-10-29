import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IBid {
    id: number;
    item: string;
    price: number;
    name: string;
}

let getAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
getAllButton.addEventListener("click", doGetAll);

function doGetAll(): void {
    let uri: string = "https://restcoinservice20181029095013.azurewebsites.net/api/bids";
    axios.get<IBid[]>(uri)
    .then(function (response: AxiosResponse<IBid[]>): void{
        console.log(response.data);
        let result: string = "<ol>";
        response.data.forEach((bid: IBid) => {
            if (bid !== null){
                result += "<li>" + bid.item + " " + bid.price + " " + bid.name + "</li>";                
            }            
        });
        result += "</ol>";
        console.log(result);
        let allBids: HTMLDivElement = <HTMLDivElement>document.getElementById("allBids");
        allBids.innerHTML = result;
    })
    .catch(function (error: AxiosError): void {
        console.log(error);
    })
}

let getOneCoin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getOneCoinButton");
getOneCoin.addEventListener("click", getOneItem);

function getOneItem(): void {
    let getIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("inputId");
    let id: number = parseInt(getIdElement.value);
    let uri: string = "https://restcoinservice20181029095013.azurewebsites.net/api/bids/" + id.toString();
    axios.get(uri)
    .then (function (response: AxiosResponse<IBid>): void {
        console.log(response.data);
        let result: string = response.data.name + " " + response.data.item;
        let aCoin: HTMLDivElement = <HTMLDivElement>document.getElementById("oneCoin");
        aCoin.innerHTML = result;
    })
    .catch(function (error: AxiosError): void{
        console.log(error);
    })
}

let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
deleteButton.addEventListener("click", doDelete);

function doDelete(): void {
    let getIDElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteId");
    let id: number = parseInt(getIDElement.value);
    let uri: string = "https://restcoinservice20181029095013.azurewebsites.net/api/bids/" + id.toString();
    axios.delete(uri)
        .then(function (response: AxiosResponse){
            console.log(response.status + " " + response.statusText)
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
}

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", doAdd);

function doAdd(): void {
    let newIDElement: HTMLInputElement = <HTMLInputElement>document.getElementById("newID");
    let newItemElement: HTMLInputElement = <HTMLInputElement>document.getElementById("newItem");
    let newPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("newPrice");
    let newNameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("newName");

    let myID: number = parseInt(newIDElement.value);
    let myItem: string = newItemElement.value;
    let myPrice: number = parseInt(newPriceElement.value);
    let myName: string = newNameElement.value;

    let uri: string = "https://restcoinservice20181029095013.azurewebsites.net/api/bids";
    axios.post<IBid>(uri, {id: myID, item: myItem, price: myPrice, name: myName})
    .then(function(response: AxiosResponse){
        console.log(response.status + " " + response.statusText);
    })
    .catch((error: AxiosError) => {
        console.log(error)
    })
}