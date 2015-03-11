/**************************************************************
* A command line tool for rhyming words
*
* Created By: Nick DelBen
* Created On: March 10, 2015
*
* Last Edited: March 10, 2015
*   - Created initially
**************************************************************/

Getopt = require('node-getopt');
rhyme  = require('rhyme');

function main() {
  var amount;
  var amount_in;
  var words;
  var helpMessage;

  helpMessage = 'Usage: node ' + process.argv[1].match(/(?:.*[\/\\])?(.*)$/)[1] + ' [OPTIONS] <word> \n\nOptions:\n[[OPTIONS]]\n';

  //Set the command line options
  getopt = new Getopt([
    ['h', 'help',        'Display command help'],
    ['n', 'show=ARG',    'Number of rhyming words to show'],
    ['l', 'list',        'Display results as a list'],
    ['p', 'perfect',     'Only show perfect rhymes'],
    ['o', 'noOffensive', 'Only show rusults that are not offensive'],
    ['d', 'dictionary',  'Only show results that would be in a dictionary']
  ]);

  getopt.bindHelp(helpMessage);

  //Parse the command line options
  opt = getopt.parse(process.argv.slice(2));
  //If user requested help display help context and terminate
  if (opt.options.help != null) {
    getopt.showHelp();
    return 0;
  }

  //Check to ensure the user entered a word to display
  if (opt.argv.length != 1) {
    getopt.showHelp();
    return -1;
  }

  //By default show 15 results
  amount = 50
  //Check to make sure all command line options were passed
  if (opt.options.show != null) {
    //Check valid number of results was entered
    if (isNaN(amount_in = parseInt(opt.options.show, 10)) || amount_in <= 0) {
      //If the user specified invalid amount of words to show notify them and teminate execution
      process.stderr.write("Invalid Amount of words to show. Must be at least 1\n");
      return -2;
    }
    amount = amount_in;
  }
  
  //Find the rhyming words
  rhyme.printRhymes(opt.argv[0], amount, opt.options.perfect, opt.options.noOffensive, opt.options.dictionary, opt.options.list);

  return 0;
}

return main();