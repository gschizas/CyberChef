/**
 * Created by gschizas on 17/9/2014.
 */

var Romanize = {

    run: function(greekText, args) {
        var SIMPLE_TRANSLATION_GREEK = "άβδέζήιίϊΐκλνξόπρσςτυύϋΰφωώ";
        var SIMPLE_TRANSLATION_LATIN = "avdeziiiiiklnxoprsstyyyyfoo";
        var DIGRAPH_TRANSLATION_GREEK = "θχψ";
        var DIGRAPH_TRANSLATION_LATIN = "thchps";
        var DIGRAPH_YPSILON_GREEK = "αεη";
        var DIGRAPH_YPSILON_LATIN = "aei";
        var DIGRAPH_YPSILON_BETA = "βγδζλμνραάεέηήιίϊΐοόυύϋΰωώ";
        var DIGRAPH_YPSILON_PHI = "θκξπστφχψ";

        var result = "";
        var cursor = 0;
        var letter, newLetter, previousLetter, nextLetter, thirdLetter;
        var isUpper, isUpper2;
        while (cursor < greekText.length) {
            letter = greekText.charAt(cursor);
            previousLetter = (cursor > 0) ? greekText.charAt(cursor - 1) : "";
            nextLetter = (cursor < greekText.length - 1) ? greekText.charAt(cursor + 1) : "";
            thirdLetter = (cursor < greekText.length - 2) ? greekText.charAt(cursor + 2) : "";

            isUpper = (letter.toUpperCase() == letter);
            isUpper2 = (nextLetter.toUpperCase() == nextLetter);
            letter = letter.toLowerCase();
            previousLetter = previousLetter.toLowerCase();
            nextLetter = nextLetter.toLowerCase();
            thirdLetter = thirdLetter.toLowerCase();

            if (SIMPLE_TRANSLATION_GREEK.indexOf(letter) >= 0) {
                newLetter = SIMPLE_TRANSLATION_LATIN.charAt(SIMPLE_TRANSLATION_GREEK.indexOf(letter));
            }
            else if (DIGRAPH_TRANSLATION_GREEK.indexOf(letter) >= 0) {
                var diphthong_index = DIGRAPH_TRANSLATION_GREEK.indexOf(letter);
                newLetter = DIGRAPH_TRANSLATION_LATIN.substr(diphthong_index * 2, 2);
            }
            else if (DIGRAPH_YPSILON_GREEK.indexOf(letter) >= 0) {
                newLetter = DIGRAPH_YPSILON_LATIN.charAt(DIGRAPH_YPSILON_GREEK.indexOf(letter));
                if (nextLetter == "υ" || nextLetter == "ύ") {
                    if (DIGRAPH_YPSILON_BETA.indexOf(thirdLetter) >= 0) {
                        newLetter += "v";
                        cursor++;
                    }
                    else if (DIGRAPH_YPSILON_PHI.indexOf(thirdLetter) >= 0) {
                        newLetter += "f";
                        cursor++;
                    }
                }
            }
            else if (letter == "γ") {
                if (nextLetter == "γ") {
                    newLetter = "ng";
                    cursor++;
                }
                else if (nextLetter == "ξ") {
                    newLetter = "nx";
                    cursor++;
                }
                else if (nextLetter == "χ") {
                    newLetter = "nch";
                    cursor++;
                }
                else {
                    newLetter = "g";
                }
            }
            else if (letter == "μ") {
                if (nextLetter == "π") {
                    if (previousLetter.trim() == "" || thirdLetter.trim() == "") {
                        newLetter = "b";
                        cursor++;
                    }
                    else {
                        newLetter = "mp";
                        cursor++;
                    }
                }
                else {
                    newLetter = "m";
                }
            }
            else if (letter == "ο") {
                newLetter = "o";
                if (nextLetter == "υ" || nextLetter == "ύ") {
                    newLetter += "u";
                    cursor++;
                }
            }
            else {
                newLetter = letter;
            }

            if (isUpper) {
                newLetter = newLetter.charAt(0).toUpperCase() +
                    (isUpper2 ? newLetter.substring(1).toUpperCase() : newLetter.substring(1).toLowerCase());
            }

            result += newLetter;
            cursor++;
        }
        return result;
    }
}