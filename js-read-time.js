var textUtils = function(o) {
  var settings = {
    readWordsPerMin: 280,
    minute: 'minute',
    minutes: 'minutes',
    lessThan: 'Less than'
  };
  
  if (typeof o !== 'undefined') {
    settings.minute = o.messages.minute;
    settings.minutes = o.messages.minutes;
    settings.lessThan = o.messages.lessThan;
  }
  
  /**
   * Return total number of words in text
   *
   * {Node}  DOM element
   */
  _getTotalWords = function(el) {
    var text = el.textContent;
    return text.trim().split(/\s+/g).length;
  };
  
  /**
   * Return reading time.
   *
   * {Node}   DOM element
   * {String} format 'null | human | clock'
   */
  _getReadingTime = function(el, format) {
    var totalWords = _getTotalWords(el);
    var totalSeconds = totalWords / (settings.readWordsPerMin / totalWords);
    
    if (!format) {
      return Math.round(totalSeconds);
    } else if (format === 'human') {
      var total = (totalSeconds / 60);
      
      if (total <= 1) {
        return settings.lessThan + ' 1 ' + settings.minute;
      } else if (total <= 2) {
        return settings.lessThan + ' 2 ' + settings.minutes;
      } else {
        return Math.round(total) + ' ' + settings.minutes;
      }
      
    } else if (format === 'minutes') {
      return Math.floor(totalSeconds / 60);
    } else if (format === 'clock') {
      return _convertToDisplayTime(totalSeconds);
    }
  };
  
  /**
   * Converts seconds to digital format of 00:00:00
   * {Number} sec  Seconds
   *
   */
  _convertToDisplayTime = function(sec) {
    var hours = parseInt( sec / 3600 ) % 24;
    var minutes = parseInt( sec / 60 ) % 60;
    var seconds = parseInt(sec % 60, 10);

    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    
    return result;
  };
  
  return {
    getReadingTime: function(el, format) {
      return _getReadingTime(el, format);
    },
    
    getTotalWords: function(el) {
      return _getTotalWords(el);
    }
  };
  
  
};

///////// SAMPLE USAGE

var el = document.querySelectorAll('.article')[0];

var text = textUtils({
  messages: {
    minute: 'min',
    minutes: 'mins',
    lessThan: '<'
  }
});

var readingTime = text.getReadingTime(el, 'human');
var clockTime = text.getReadingTime(el, 'clock');
var totalWords = text.getTotalWords(el);

console.log(readingTime);
console.log(totalWords);
console.log(clockTime);
