// Updated August 17, 2015 by Lawrence Hook

$(document).ready( function() {
	// find all text nods inside a font tag, wrap with toReplace div
	$('body')
		.find('*')
		.contents()
		.filter( function () {
			var parentArray = $(this).parents();
			return this.nodeType === 3 && parentArray.is("font");
		})
		.wrap( '<div class="toReplace"></div>' );

	// Convert content inside toReplace divs
	$(".toReplace").each( function () {
		var xdvng_text = $(this).text();
		$(this).text(convertToUnicode(xdvng_text));
	});

	// Remove toReplace divs
	$(".toReplace").contents().unwrap();	
});

function wrapText () {

}

function convertToUnicode(input_string) {
	if (input_string == undefined || input_string.trim == '') {
		return '';
	} else {
		return replaceSymbols(input_string);		
	}
}

//substitute unicode_char_set elements in place of corresponding xdvng_charset elements
function replaceSymbols (toConvert) {
	for(input_symbol_idx = 0; input_symbol_idx < xdvng_charset_length; input_symbol_idx++) {
		// index of the symbol being searched for replacement
		indx = 0;

		while (indx != -1 ) {
			toConvert = toConvert.replace(xdvng_charset[input_symbol_idx], unicode_char_set[input_symbol_idx]);
			indx = toConvert.indexOf(xdvng_charset[input_symbol_idx]);
		}
	}

	// Code for Replacing  Special glyphs
	// chhotii 'i' kii maatraa  and its position  correction

	var position_of_i = toConvert.indexOf('e');

	while (position_of_i != -1) {
		var character_next_to_i = toConvert.charAt( position_of_i + 1 ),
			character_to_be_replaced = 'e' + character_next_to_i;

		toConvert = toConvert.replace(character_to_be_replaced, character_next_to_i + 'ि'); 
		// search for  'o' ahead of the current position.
		position_of_i = toConvert.search(/e/, position_of_i + 1);
	}

	// following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.
	var position_of_wrong_ee = toConvert.indexOf( 'ि्' );

	while (position_of_wrong_ee != -1) {
		var consonent_next_to_wrong_ee = toConvert.charAt(position_of_wrong_ee + 2),
			character_to_be_replaced = 'ि्' + consonent_next_to_wrong_ee;

		toConvert = toConvert.replace(character_to_be_replaced, '्' + consonent_next_to_wrong_ee + 'ि');
		// search for 'wrong ee' ahead of the current position.
		position_of_wrong_ee = toConvert.search(/ि्/, position_of_wrong_ee + 2);
	}

	//Eliminating reph 'ü' and putting 'half - r' at proper position for this.
	set_of_matras = 'ािीुूृेैोौंःँॅ';
	var position_of_reph = toConvert.indexOf('ü');

	while (position_of_reph > 0) {
		var probable_position_of_half_r = position_of_reph - 1,
			character_at_probable_position_of_half_r = toConvert.charAt(probable_position_of_half_r);


		// trying to find non-maatra position left to current O (ie, half -r).
		while (set_of_matras.match(character_at_probable_position_of_half_r) != null) {
			probable_position_of_half_r = probable_position_of_half_r - 1;
			character_at_probable_position_of_half_r = toConvert.charAt(probable_position_of_half_r);
		}

		character_to_be_replaced = toConvert.substr(probable_position_of_half_r, (position_of_reph - probable_position_of_half_r));
		new_replacement_string = 'र्' + character_to_be_replaced;
		character_to_be_replaced = character_to_be_replaced + 'ü';
		toConvert = toConvert.replace(character_to_be_replaced, new_replacement_string);
		position_of_reph = toConvert.indexOf('ü');
	}

	return toConvert;
}
var xdvng_charset = [
	'z:', 'û', 'ø', 'Q:', '¬', 'q', 'Å', '^:', 'ô',

	'k', 'K:', 'g:', 'G:',
	'V', 'K', 'g', 'G',
	'c:', 'C', 'j:', 'J:',
	'c', 'C', 'j', 'J',
	'X', 'Y', 'R', '\_', 'Z', '`', 'N:', 
	'X', 'Y', 'R', '`', 'N', 
	't:', 'T:', 'd', 'D:', 'n:',
	't', 'T', 'd', 'D', 'n',
	'p:', 'P', 'f', 'b:', 'B:', 'm:',
	'p', 'P', 'f', 'b', 'B', 'm',
	'y:', 'r', 'l:', 'v:',
	'y', 'r', 'l', 'v',
	's:', 'S:', '\\:', 'h', 'x:', 'w',
	's', 'S', '\\', 'h', 'x', 
	'*:', '¹', 'Â:', 'É', 'Ã:', '²', '\-','\#', '¤', '½', '$', 'Ä', '¶:', 'Æ',
	'¢', '¾', '\)', 'Ò', 'Ó', 'Á:', 'À',
	'A:ð', 'A:ò', 'A:', 'A', 'E', 'I', 'u', 'U', 'Oð', 'O', '?',
	'Ï', 'Î', '|', 'a', 'i', 'Ù', 'Û', 'Ø', 'Ú', 'Ü', 'Ý', 'Þ',
	':ð', 'ð', 'ñ', ':ò', 'ò', 'ó', 'ö', 'ú', 'H', 'á', 'à',
	'.'
];
var unicode_char_set = [
	'ज़', 'ँ', 'ं', 'ख़', 'ट्ट', 'क़', 'ष्ठ', 'ग़', 'ॅ',

	'क', 'ख', 'ग', 'घ',
	'क्', 'ख्', 'ग्', 'घ्',
	'च', 'छ', 'ज', 'झ',
	'च्', 'छ्', 'ज्', 'झ्',
	'ट', 'ठ', 'ड', 'ड़', 'ढ', 'ढ़', 'ण',
	'ट्', 'ठ्', 'ड्', 'ढ़्', 'ण्',
	'त', 'थ', 'द', 'ध', 'न', 
	'त्', 'थ्', 'द्', 'ध्', 'न्', 
	'प', 'फ', 'फ', 'ब', 'भ', 'म',
	'प्', 'फ्', 'फ्', 'ब्', 'भ्', 'म्',
	'य', 'र', 'ल', 'व',
	'य्', 'र्', 'ल्', 'व्',
	'स', 'श', 'ष', 'ह', 'क्ष', 'ज्ञ', 
	'स्', 'श्', 'ष्', 'ह्', 'क्ष्',
	'त्र', 'द्ध', 'श्र', 'ह्म', 'श्व', 'ड्ड', 'रू', 'क्र', 'ङ्ग', 'द्य', 'ज्र', 'ष्ट', 'त्त', 'हृ',
	'ङ्क', 'द्व', 'प्र', '्र', '्र', 'श्च', 'न्न',
	'ओ', 'औ', 'आ', 'अ', 'इ', 'ई', 'उ', 'ऊ', 'ऐ', 'ए', 'ऋ', 
	'्', '्', 'ऽ', 'ा', 'ी', 'ु', 'ु', 'ु', 'ु', 'ू', 'ू', 'ू', 
	'ो', 'े', 'े', 'ौ', 'ै', 'ै', 'ं', 'ँ', ':', 'ृ', 'ृ', 
	'।'
];
var xdvng_charset_length = xdvng_charset.length;
