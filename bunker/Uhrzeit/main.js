let vocab = {0: "null", 1:"eins", 2:"zwei"};
let resultList = document.querySelector(".result");
let input = document.querySelector(".form-control");

input.value = (new Date()).getHours() + " Uhr " + (new Date()).getMinutes();

const updateResult = inputText => {
	resultList.innerHTML = "";
	input.style.boxShadow = "";

	let matchTime = input.value.split(/(uhr)|(\.+)/i).filter(e => (e && e.toLowerCase() !== "uhr" && !e.match(/\.+?/)))
	let h = parseInt(matchTime[0].trim());
	let m = parseInt(matchTime[1] ? matchTime[1].trim() : 0);

	if(h <= 24 && h >= 0 && m >= 0 && m <= 59){
		resultList.innerHTML += `<li class="list-group-item">Es ist ${parseTime(h, m)}</li>`;
	} else {
		resultList.innerHTML = "";
		input.style.boxShadow = `0 0 0 .2rem rgba(255,123,123,.5)`;
	}	
}

updateResult("")


function parseTime(h, m) {

	if(h == 24) h = 0;

	if(m == 0) return `${h} Uhr`;

	if(m == 15) return `Viertel nach ${h}`;
	if(m == 30) return `halb ${h == 23 ? 12 : h+1}`;
	if(m == 45) return `Viertel vor ${h}`;

	if(m < 30) return `${m} nach ${h}`;
	if(m > 30) return `${60-m} vor ${h+1}`;	

	//return `${m} nach ${h}`;
}