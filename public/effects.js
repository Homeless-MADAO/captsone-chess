// Create soundFX and voice audio channels
window.soundFX = [];

$(document).ready(function () {
  // prepare all soundport elements
  for (var i = 0; i < 5; i++) {
    let x = document.createElement("audio");
    x.setAttribute("controls", "none");
    x.setAttribute("src", "audio/move.mp3");
    x.style.display = "none";
    x.id = "sound" + i;
    document.body.appendChild(x);
    window.soundFX[i] = document.getElementById("sound" + i);
    console.log("Soundport #" + i + " is ready.");
  }
});

/*
var voice = [];
for (i = 0; i < 3; i++) {
	let x = document.createElement("audio");
	x.setAttribute("controls", "none");
	x.setAttribute("src", "audio/voice/hum.ogg");
	x.style.display = "none";
	x.id = "voice" + i;
	document.body.appendChild(x);
	voice[i] = document.getElementById("a" + i);
}
*/

// sets soundFX to specified source from audio folder
function setSound(x, src) {
  // does not set a source if second parameter is null
  if (src != null) {
    window.soundFX[x].src = "audio/" + src;
  } else {
    console.log("Sound File nonexistant");
  }
}

// auxillary function for testing
function test() {}

// Load a sound by playing it muted
function loadSound(x) {
  window.soundFX[x].muted = true;
  window.soundFX[x].play();
  window.soundFX[x].addEventListener("ended", function () {
    window.soundFX[x].currentTime = 0;
    window.soundFX[x].muted = false;
  });
}

$(document).ready(function () {
  flashingTitle();
});

function begin() {
  /*
	soundFX[0].play();
	soundFX[0].addEventListener("ended", function(){
		document.body.style.backgroundColor = "var(--blue)";
		setTimeout(function () {
			$("#startBut").off("mouseenter");
			$("#startBut").on("mouseenter" , function() {
				$( this ).css("cursor", "pointer");
			});
			document.body.style.backgroundColor = "var(--black)";
			mainInit();
		}, 1250);
		soundFX[1].play();
	});
  */
  $("#startBut").fadeOut("slow");
  fade("#titleScreen", "#lobby");
  mainInit();
}

// returns user to the title screen
function resetTitle() {
  fade("#lobby", "#titleScreen");
  fade("#lobby", "#startBut");
  $("#startBut").addClass("slowBlink");
  $("#startBut").html("Play again");
  $("#startBut").css({
    color: "var(--gold)",
    "font-size": "calc(0.75vw + 40px)",
  });
  flashingTitle();
}

// flashes startBut
function flashingTitle() {
  $("#startBut")
    .on("mouseenter", function () {
      $(this).removeClass("slowBlink");
      $(this).css({
        color: "white",
        cursor: "pointer",
        "font-size": "calc(1.2vw + 40px)",
      });
    })
    .on("mouseleave", function () {
      $(this).css({ color: "var(--gold)", "font-size": "calc(0.75vw + 40px)" });
      $(this).addClass("slowBlink");
    })
    .click(function () {
      begin();
      $(this).html("Loading...");
      $(this).off("mouseleave");
      $(this).off("click");
      $(this).on("mouseenter", function () {
        $(this).css("cursor", "progress");
      });
    });
}

// Fadein and exit functions are responisble for navigation
// Changes screens by fading in and out
function fade(x, y) {
  // Disable clicking to prevent button pressing during animation
  $("#mainContainer").css("pointer-events", "none");

  // Fadeout x, then fadein y
  // Use jQuery to select x and make it fade out.
  $(x).css({
    visibility: "hidden",
    opacity: "0",
    transition: "visibility 400ms ease, opacity 400ms ease",
  });

  setTimeout(function () {
    //Enable clicking
    $("#mainContainer").css("pointer-events", "auto");

    // Hide x
    $(x).hide();
    // Load y once fadeout animation is done
    $(y).show();

    load();
  }, 600);

  function load() {
    // fadein y
    $(y).css({
      visibility: "visible",
      opacity: "1",
      transition: "visibility 400ms ease, opacity 400ms ease",
    });
  }
}
