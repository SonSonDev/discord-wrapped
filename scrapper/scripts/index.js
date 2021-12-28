let emojireg = /<(a?):([^<>]+):([0-9]+)>/g;


const text = "coucou hihi <a:kokoroyay:123>";


let a = text.match(emojireg);


a;
