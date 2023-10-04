// Get UI
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');
const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById('open-btn');
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');

// const dummydatas = [
// 	{id:1,transtatus:'+',amount:1000,date:"2023-01-20",remark:'Pretty Cash'},
// 	{id:2,transtatus:'-',amount:-20,date:"2023-01-21",remark:'Pen'},
// 	{id:3,transtatus:'+',amount:300,date:"2023-01-25",remark:'Other Income'},
// 	{id:4,transtatus:'-',amount:-10,date:"2023-01-25",remark:'Book'},
// 	{id:5,transtatus:'-',amount:-150,date:"2023-01-26",remark:'Water'},
// 	{id:6,transtatus:'-',amount:-100,date:"2023-01-26",remark:'Teamix'},
// 	];

// console.log(dummydatas);

const getdatas = JSON.parse(localStorage.getItem('transations'));
let gethistories = localStorage.getItem('transations') !== null ? getdatas : [];

function init(){
	getlistgroup.innerHTML = '';

	// Method 1
	// dummydatas.forEach(function(dummydata){
	// 	// console.log(dummydata);

	// 	addtoui(dummydata);
	// });

	// Method 2
	// dummydatas.forEach(dummydata=>addtoui(dummydata));

	// Method 3
	// dummydatas.forEach(addtoui);

	gethistories.forEach(addtoui);

	totalvalue();
}

init();


// Create li to ul

function addtoui(transcation){
	// console.log(transcation);
	// console.log(transcation.amount,)

	const newli = document.createElement('li');
	newli.className = 'list-group-item';
	newli.innerHTML = `${transcation.remark}<span>${transcation.amount}</span><span>${transcation.date}</span><button type="button" class="delete-btn" onclick="removetransaction(${transcation.id})">&times;</button>`;
	
	newli.classList.add(transcation.transtatus === '+' ? "inc" : "dec");

	// console.log(newli);

	getlistgroup.appendChild(newli);

}

var sign = '-';

gettranstatuses.forEach(function(gettranstatus){
	gettranstatus.addEventListener('change',function(){
		// console.log(this.value);

		if(this.value === 'debit'){
			sign = "+";
		}else if(this.value === 'credit'){
			sign = "-";
		}
	});
})

function newtransation(e){

	// console.log('hay');

	// console.log(sign);

	if(isNaN(getamount.value) || getamount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === ''){
		window.alert('Ohhh! Some datas are missing.');
	}else{
		// console.log('hay');

		// {id:1,transtatus:'+',amount:1000,date:"2023-01-20",remark:'Pretty Cash'}
		const transation = {
			id:generateidx(),
			transtatus:sign,
			amount:sign === '-' ? Number(-getamount.value) : Number(getamount.value),
			date:getdate.value,
			remark:getremark.value
		}

		// console.log(transation);

		gethistories.push(transation);

		addtoui(transation);

		totalvalue();

		updatelocalstorage();

		getamount.value = '';
		getdate.value = '';
		getremark.value = '';

		getamount.focus();
	}

	e.preventDefault();
}

function updatelocalstorage(){
	localStorage.setItem('transations',JSON.stringify(gethistories));
}

function generateidx(){
	return Math.floor(Math.random() * 100000);
}

function totalvalue(){
	const amounts = gethistories.map(gethistory=>gethistory.amount);
	// console.log(amounts);

	// Method 1 
	// const result = amounts.reduce(function(total,curvalue){
	// 	return total += curvalue;
	// },0).toFixed(2);
	// console.log(result);

	// Method 2
	const totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
	const debitresult = amounts.filter(amount=>amount > 0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
	const creditreslt = (amounts.filter(amount=>amount < 0).reduce((total,curvalue)=>(total += curvalue),0)*-1).toFixed(2);

	// console.log(totalresult);
	// console.log(debitresul);
	// console.log(creditreslt);

	balance.innerText = `${totalresult}`;
	moneydeb.textContent = `${debitresult}`;
	moneycrd.textContent = `${creditreslt}`;

	
}

// totalvalue();

function removetransaction(tranid){
	gethistories = gethistories.filter(gethistory => gethistory.id !== tranid);

	init();

	updatelocalstorage();
}

openbtn.addEventListener('click',function(){
	gethisbox.classList.toggle('show');
});

getform.addEventListener('submit',newtransation);

var myarrs = [10,20,30,40,50,60,70,80,90,-100];

// array.reduce(function(total,curvalue,curidx,arr){},initialValue);

var result = myarrs.reduce(function(total,curvalue,curidx,arr){
	// console.log('this is total = ',total); // 0 // if we use 1 perameter 10

	// console.log('this is curvalue = ',curvalue); // 10 to 100 by number // if we use 1 perameter 20 t0 100 by number
	// console.log('this is curidx = ',curidx; // 0 to 9 index number // if we use 1 perameter 1 t0 9 index number
	// console.log(arr);

	total += curvalue;

	return total;
},0);

// console.log(result);

