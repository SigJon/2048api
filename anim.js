(function($) {

  $.fn.game2048 = function() {
  var final_score = 0;
  $(this).append(display_array());
  play_the_game();

  function display_array()
  {
    // create ScoreBox
    var pt = '<div class="score_title">SCORE<div class="score">0</div></div>';
    // Create table with id
    pt += '<table id="2048table">';

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
    return (pt);
  }

  function score(points)
  {
    final_score += points;
    $('.score').text(final_score);
    console.log(final_score);
    return(final_score);
  }


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
        if(select[0] && case_over() == false)
        {
          var value = generate_numbers();
          select.append(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
        }
        else if (case_over() == false)
        {
          generate_cases(1);
        }
      i++;
    }
  }

  function case_over()
  {
    var full_flag = 0;
      for(var x=0; x<4; x++)
      {
        for(var y=0; y<4; y++)
        {
          var select = $('[x='+x+'][y='+y+']');
          if(select.attr('nbr') != 0)
          {
          full_flag++;
          }
          else
          {
            return false;
          }
        }
      }
      if(full_flag == 16)
      {
        game_over();
      }
    else
    {
      return false;
    }
  }

  function game_over()
  {
      for(var x=0; x<4; x++)
      {
        for(var y=0; y<4; y++)
        {
          var select = $('[x='+x+'][y='+y+']');
          var select_down = $('[x='+(x+1)+'][y='+y+']');
          var select_right = $('[x='+x+'][y='+(y+1)+']');
          if(select_down.attr('nbr') == select.attr('nbr') || select_right.attr('nbr') == select.attr('nbr'))
          {
            return false;
          }
        }
      }
      if(confirm("Game Over Looser !"))
      {
        location.reload();
      }
      else {
        return false;
      }
  }

  function mergeRight(select, select_right)
  {
    var value = select.attr('nbr');
    var new_value = 2*value;
    select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
    select_right.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
    score(new_value);
  }

  function mergeLeft(select, select_left)
  {
    var value = select.attr('nbr');
    var new_value = 2*value;
    select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
    select_left.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
    score(new_value);

  }

  function mergeUp(select, select_up)
  {
    var value = select.attr('nbr');
    var new_value = 2*value;
    select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
    select_up.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
    score(new_value);
  }

  function mergeDown(select, select_down)
  {
    var value = select.attr('nbr');
    var new_value = 2*value;
    select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
    select_down.text(new_value).attr('nbr', new_value).removeClass("nul").removeClass("nb"+value+"").addClass("nb"+new_value+"");
    score(new_value);
  }


  function move_right()
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
                    }
                        if(select_right.attr('nbr') == 0)//if the last case on the right is empty
                        {
                          var value = select.attr('nbr');
                          select_right.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                          select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                        }
                        else if(select_right.attr('nbr') != select.attr('nbr') && select_right.attr('nbr') != 0)//if the last case on the right as a value but diffrent
                        {
                          var value = select.attr('nbr');
                          var new_select = $('[x='+x+'][y='+(z-2)+']');
                          new_select.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                          select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                        }
                        else if(select_right.attr('nbr') == select.attr('nbr'))// if the last case on the right has the same value
                        {
                          mergeRight(select, select_right);
                      }
                }
                else if(select_right.attr('nbr') == select.attr('nbr'))
                {
                  mergeRight(select, select_right);
                }
            }
          }
        }
  };

function move_left()
{
      for(var x=0; x<4; x++)
      {
        for(var y=1; y<4; y++)
        {
          var select = $('[x='+x+'][y='+y+']');
          if(select.attr('nbr') != 0)
          {
            var select_left = $('[x='+x+'][y='+(y-1)+']');
              if(select_left.attr('nbr') == 0)
              {
                  var z = y-1;
                  while(select_left.attr('nbr') == 0 && z>=0) //we move on the next left case until there's a number
                  {
                    select_left = $('[x='+x+'][y='+z+']');
                    z--;
                  }
                      if(select_left.attr('nbr') == 0)//if the last case on the right is empty
                      {
                        var value = select.attr('nbr');
                        select_left.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_left.attr('nbr') != select.attr('nbr') && select_left.attr('nbr') != 0)//if the last case on the right as a value but diffrent
                      {
                        var value = select.attr('nbr');
                        var new_select = $('[x='+x+'][y='+(z+2)+']');
                        new_select.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_left.attr('nbr') == select.attr('nbr'))// if the last case on the right has the same value
                      {
                        mergeLeft(select, select_left);
                      }
              }
              else if(select_left.attr('nbr') == select.attr('nbr'))
              {
                mergeLeft(select, select_left);
              }
          }
        }
      }
};

function move_up()
{
      for(var y=0; y<4; y++)
      {
        for(var x=1; x<4; x++)
        {
          var select = $('[x='+x+'][y='+y+']');
          if(select.attr('nbr') != 0)
          {
            var select_up = $('[x='+(x-1)+'][y='+y+']');
              if(select_up.attr('nbr') == 0)
              {
                  var z = x-1;
                  while(select_up.attr('nbr') == 0 && z>=0) //we move on the next left case until there's a number
                  {
                    select_up = $('[x='+z+'][y='+y+']');
                    z--;
                  }
                      if(select_up.attr('nbr') == 0)//if the last case on the right is empty
                      {
                        var value = select.attr('nbr');
                        select_up.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_up.attr('nbr') != select.attr('nbr') && select_up.attr('nbr') != 0)//if the last case on the right as a value but diffrent
                      {
                        var value = select.attr('nbr');
                        var new_select = $('[x='+(z+2)+'][y='+y+']');
                        new_select.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_up.attr('nbr') == select.attr('nbr'))// if the last case on the right has the same value
                      {
                        mergeUp(select, select_up);
                      }
              }
              else if(select_up.attr('nbr') == select.attr('nbr'))
              {
                mergeUp(select, select_up);
              }
          }
        }
      }
};

function move_down()
{
      for(var y=0; y<4; y++)
      {
        for(var x=2; x>=0; x--)
        {
          var select = $('[x='+x+'][y='+y+']');
          if(select.attr('nbr') != 0)
          {
            var select_down = $('[x='+(x+1)+'][y='+y+']');
              if(select_down.attr('nbr') == 0)
              {
                  var z = x+1;
                  while(select_down.attr('nbr') == 0 && z<4) //we move on the next left case until there's a number
                  {
                    select_down = $('[x='+z+'][y='+y+']');
                    z++;
                  }
                      if(select_down.attr('nbr') == 0)//if the last case on the right is empty
                      {
                        var value = select.attr('nbr');
                        select_down.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_down.attr('nbr') != select.attr('nbr') && select_down.attr('nbr') != 0)//if the last case on the right as a value but diffrent
                      {
                        var value = select.attr('nbr');
                        var new_select = $('[x='+(z-2)+'][y='+y+']');
                        new_select.text(value).attr('nbr', value).removeClass("nul").addClass("nb"+value+"");
                        select.text("").attr('nbr', 0).removeClass("nb"+value+"").addClass("nul");
                      }
                      else if(select_down.attr('nbr') == select.attr('nbr'))// if the last case on the right has the same value
                      {
                        mergeDown(select, select_down);
                      }
              }
              else if(select_down.attr('nbr') == select.attr('nbr'))
              {
                mergeDown(select, select_down);
              }
          }
        }
      }
};

function play_the_game()
{
  generate_cases(2);
}

window.addEventListener("keydown", function (event)
{
  if(event.keyCode == 37)
  {
    move_left();
    generate_cases(1);
  }
  else if(event.keyCode == 38)
  {
    move_up();
    generate_cases(1);
  }
  else if(event.keyCode == 39)
  {
    move_right();
    generate_cases(1);
  }
  else if(event.keyCode == 40)
  {
    move_down();
    generate_cases(1);
  }
});
};
})(jQuery);
