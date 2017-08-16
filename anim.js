$(document).ready(function()
{
  function display_array()
  {
    // Create table with id
    var pt = '<table id="2048table">';

    // For-loop to create rows
    for (var x=0; x<4; x++)
    {
         // For-loop to create cells
        pt += '<tr>';
        for (var y=0; y<4; y++)
        {
            pt += '<td ';
            pt += "x=\"" + x + "\" y=\"" + y + "\" nbr=\"" + 0 + "\" class=\"nul\">";//add content to TD
            pt += '</td>';
        }
        pt += '</tr>';
    }
    pt += '</table>';
    $('#game').append(pt);
  }
      display_array();
});

$(document).ready(function()
{
  function generate_numbers()
  {
      var min = 2;
      var max = 4;
      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      if(random == 3)
      {
        random = random - 1;
      }
      return random;
  }

  function generate_cases(num)
  {
    //generate random x position
    var i = 0;
    while(i<num)
    {
      var min_x = 0;
      var max_x = 3;
      var random_x = Math.floor(Math.random() * (max_x - min_x + 1)) + min_x;
      //generate random y position
      var min_y = 0;
      var max_y = 3;
      var random_y = Math.floor(Math.random() * (max_y - min_y + 1)) + min_y;

      var select = $('[x='+random_x+'][y='+random_y+'][nbr = 0]');
        if(select[0])
        {
          var value = generate_numbers();
          select.append(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
        }
        else
        {
          generate_cases(1);
        }
      i++;
    }
  }
  var turn = 0;
  if(turn == 0)
  {
  generate_cases(2);
  turn++;
  }
  else {
    generate_cases(1);
  }
});



$(document).ready(function()
{
  function move_right()
  {
    window.addEventListener("keydown", function (event)
    {
      if(event.keyCode == 39)
      {
        for(var x=3; x>=0; x--)
        {
          for(var y=2; y>=0; y--) //y starts at 2 because we don't need to move the row where y=3
          {
            var select = $('[x='+x+'][y='+y+']');
            if(select.attr('nbr') != 0)
            {
              var select_right = $('[x='+x+'][y='+(y+1)+']');
                if(select_right.attr('nbr') == 0)
                {
                    var z = y+1;
                    while(select_right.attr('nbr') == 0 && z<=3) //we move on the next right case until there's a number
                    {
                      select_right = $('[x='+x+'][y='+z+']');
                      z++;
                      console.log("toto");
                    }
                  console.log(select_right);
                        if(select_right.attr('nbr') == 0)//if the last case on the right is empty
                        {
                          var value = select.attr('nbr');
                          select_right.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                          select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                        }
                        else if(select_right.attr('nbr') != select.attr('nbr') && select_right.attr('nbr') != 0)//if the last case on the right as a value but diffrent
                        {
                          var value = select.attr('nbr');
                          console.log("tata");
                          var new_select = $('[x='+x+'][y='+(z-2)+']');
                          new_select.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                          select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                        }
                        else if(select_right.attr('nbr') == select.attr('nbr'))// if the last case on the right has the same value
                        {
                          var value = select.attr('nbr');
                          var new_value = 2*value;
                          select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                          select_right.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
                        }
                }
                else if(select_right.attr('nbr') == select.attr('nbr'))
                {
                  var value = select.attr('nbr');
                  console.log(value);
                  var new_value = 2*value;
                  console.log(new_value);
                  select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                  select_right.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
                }
            }
          }
        }
      }
    });
  };
move_right();
});
