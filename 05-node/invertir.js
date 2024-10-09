function invert(o) {
	const invertir = {}
	
	for(const key in o){
		invertir[o[key]] = key
	}
	return invertir
}


