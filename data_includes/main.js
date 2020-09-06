PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

//var counterOverride = 1;
PennController.SetCounter( "setcounter" );

Sequence("setcounter","intro","consent", "recording", "instruction", randomize("trial_prac"), "warn", "instruction2", rshuffle("trial_exp", "trial_gardenpath", "trial_controlraising"), "feedback", SendResults(), "bye")

newTrial( "intro" ,
    newText("Welcome","<p>Welcome! To participate in this experiment, you must meet the following requirements.<p>(1) Your computer must have a microphone (built-in microphone is fine).<p>(2) Your browser must be either Chrome or Firefox. You CANNOT use Safari for this experiment.<p>(3) You must turn off music/video (e.g., YouTube) played on the same computer you are using to take this experiment.<p>(4) Please note that you will be asked to speak aloud during the experiment (recite simple sentences and answer simple math problems verbally). Your speech will be recorded and that's our critical data.<p>If you meet these requirements, please enter your native language and Prolific ID below and click Next:</p>")
        .settings.css("font-size", "2em")
        .settings.css("margin","50px")
        .print()
    ,
    newTextInput("Language")
        .before(newText("lang", "Your native language:<br>").settings.css("font-size", "2em").settings.css("margin","50px"))
        .settings.css("font-size", "2em")
        .settings.css("margin","50px")
        .print()
        .log()
    ,
    newTextInput("ProlificID")
        .before(newText("ID", "Your Prolific ID:<br>").settings.css("font-size", "2em").settings.css("margin", "50px"))
        .settings.css("font-size", "2em")
        .settings.css("margin","50px")
        .print()
        .log()
    ,
    newButton("Next","Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial( "consent" ,
    newText("<p>Please click <a href='https://shotam.github.io/IRB/consent_online_recording.pdf' target='_blank'>here</a> to download the consent form for this study. If you read it and agree to participate in this study, click 'I Agree' below. If you do not agree to participate in this study, you can leave this study by closing the tab.</p>")
        .settings.css("font-size", "2em")
        .settings.css("margin","50px")
        .print()
    ,
    
    newButton("Agree","I Agree")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .settings.size(500, 48)
        .print()
        .wait()
)

InitiateRecorder("https://umassgaplab.net/experiment/PCIbex_server.php", "This experiment collects audio recordings. <strong>Once you grant it access to your recording device, you will be notified of whether you are being recorded by a label at the top of the page.</strong>").label("recording")

newTrial("instruction",
    newText("Instr", "<p>In this experiment, you will first read a sentence in a word-by-word fashion. Each word will be flashed on the screen. Your task is to read the sentence silently and <b>memorize the sentence for later recall.</b></p> <p>After you see each sentence, you will see a series of 2&ndash;4 simple math problems. Your task is to <b>answer each math problem out loud</b> as it is presented to you <b>as soon as possible</b>. After you have answered the 2&ndash;4 problems, you will see the text 'recall' appear on the screen. When you see 'recall' appear, you should recite the sentence you memorized <b>aloud</b>, as soon as possible.</p> <p><b>TIP: Many people find it helpful to try to visualize the situations described by sentences when memorizing them.</b></p>")
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .print()
    ,

    newButton("Click","Click here to begin practice trials!")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .settings.size(500, 48)
        .print()
        .wait()
)


PennController.Template("practice.csv", variable => ["trial_prac",

        "DashedSentenceBig", {s: variable.Sentence, mode: 'speeded acceptability', display: "in place", wordTime: 450}
        ,
        
        "PennController", PennController(
        
            newMediaRecorder(variable.Item, "audio")
                .record()
            ,
            
            newAudio("click_prac", "click.wav")
                .play()
                .wait()
            ,
        
            newText("prob1_prac", variable.prob1)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("prob1_prac")
                .remove()
            ,
            
            newText("prob2_prac", variable.prob2)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
            ,
            
            getText("prob2_prac")
                .remove()
            ,
            
            newText("prob3_prac", variable.prob3)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("prob3_prac")
                .remove()
            , 
            
            newText("prob4_prac", variable.prob4)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("prob4_prac")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .print()
            ,
        
            newTimer("recall_timer",6000)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        )
    ]
)

newTrial( "warn",
    newText("<p> Practice done! </p> <p> <b> Please note: some participants reported that the script froze in the middle of the experiment. If this happens to you, please don’t panic, and let us know via the message function in Prolific. We will make sure that you will be compensated for the time you spent for the experiment. </b> </p>")
        .settings.css("font-size", "2em")
        .settings.css("margin","50px")
        .print()
    ,
    newButton("Next", "Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial("instruction2",
    newText("Instr2", "<p> Now, you are ready to start the experiment! Remember, your task is to:</p><p>(1) Silently read and memorize sentences presented in a word-by-word fashion.<p>(2) Answer aloud each math problem presented after the sentence.<p>(3) When you see the words 'Recall Sentence,' say the sentence you memorized out loud.")
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .print()
    ,

    newButton("Click","Click here to begin the experiment")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "80px")
        .settings.size(550, 48)
        .print()
        .wait()
)

PennController.Template("stim_exp.csv", variable => ["trial_exp",
        "DashedSentenceBig", {s: variable.Sentence, mode: 'speeded acceptability', display: "in place", wordTime: 450}
        ,
        
        "PennController", PennController(

            newMediaRecorder(variable.Item, "audio")
                .record()
            ,
            
            newAudio("click", "click.wav")
                .play()
                .wait()
            ,
        
            newText("prob1", variable.prob1)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("prob1")
                .remove()
            ,
            
            newText("prob2", variable.prob2)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("prob2")
                .remove()
            ,
            
            newText("prob3", variable.prob3)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("prob3")
                .remove()
            , 
            
            newText("prob4", variable.prob4)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("prob4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .print()
            ,
        
            newTimer("recall_timer",6000)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            getMediaRecorder(variable.Item)
                .stop()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        ).log("Category", "Experiencer")
        .log("Group", variable.Group)
        .log("Item", variable.Item)
        .log("VerbType", variable.VerbType)
        .log("SentenceVoice", variable.SentenceVoice)
        .log("Sentence", variable.Sentence)
        .log("prob1", variable.prob1)
        .log("prob2", variable.prob2)
        .log("prob3", variable.prob3)
        .log("prob4", variable.prob4)
        .log("wait1", variable.wait1)
        .log("wait2", variable.wait2)
        .log("wait3", variable.wait3)
        .log("wait4", variable.wait4)
    ]
)

PennController.Template("stim_gardenpath.csv", variable => ["trial_gardenpath",

        "DashedSentenceBig", {s: variable.Sentence, mode: 'speeded acceptability', display: "in place", wordTime: 450}
        ,
        
        "PennController", PennController(
            
            newMediaRecorder(variable.Item, "audio")
                .record()
            ,

            newAudio("click", "click.wav")
                .play()
                .wait()
            ,
        
            newText("prob1", variable.prob1)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("prob1")
                .remove()
            ,
            
            newText("prob2", variable.prob2)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("prob2")
                .remove()
            ,
            
            newText("prob3", variable.prob3)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("prob3")
                .remove()
            , 
            
            newText("prob4", variable.prob4)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("prob4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .print()
            ,
        
            newTimer("recall_timer",6000)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            getMediaRecorder(variable.Item)
                .stop()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        ).log("Category", "Garden-Path")
        .log("Group", variable.Group)
        .log("Item", variable.Item)
        .log("Comp", variable.Comp)
        .log("ObjectPr", variable.ObjectPr)
        .log("SCPr", variable.SCPr)
        .log("Bias", variable.Bias)
        .log("Sentence", variable.Sentence)
        .log("prob1", variable.prob1)
        .log("prob2", variable.prob2)
        .log("prob3", variable.prob3)
        .log("prob4", variable.prob4)
        .log("wait1", variable.wait1)
        .log("wait2", variable.wait2)
        .log("wait3", variable.wait3)
        .log("wait4", variable.wait4)
    ]
)

PennController.Template("stim_controlraising.csv", variable => ["trial_controlraising",

        "DashedSentenceBig", {s: variable.Sentence, mode: 'speeded acceptability', display: "in place", wordTime: 450}
        ,
        
        "PennController", PennController(
            
            newMediaRecorder(variable.Item, "audio")
                .record()
            ,

            newAudio("click", "click.wav")
                .play()
                .wait()
            ,
        
            newText("prob1", variable.prob1)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait1)
                .start()
                .wait()
            ,
            
            getText("prob1")
                .remove()
            ,
            
            newText("prob2", variable.prob2)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait2)
                .start()
                .wait()
            ,
            
            getText("prob2")
                .remove()
            ,
            
            newText("prob3", variable.prob3)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait3)
                .start()
                .wait()
            ,
            
            getText("prob3")
                .remove()
            , 
            
            newText("prob4", variable.prob4)
                .settings.css("font-size", "2em")
                .print()
            ,
            
            newTimer(variable.wait4)
                .start()
                .wait()
            ,
            
            getText("prob4")
                .remove()
            ,            
            
            newText("recall_prompt", "Recall Sentence")
                .settings.css("font-size", "2em")
                .color("red")
                .print()
            ,
        
            newTimer("recall_timer",6000)
                .start()
                .wait()
            ,
            
            getText("recall_prompt")
                .remove()
            ,
            
            getMediaRecorder(variable.Item)
                .stop()
            ,
            
            newButton("Next")
                .center()
                .settings.css("font-size", "2em")
                .settings.size(240, 48)
                .print()
                .wait()
                .remove()
        ).log("Category", "ControlRaising")
        .log("Group", variable.Group)
        .log("Item", variable.Item)
        .log("SentenceType", variable.SentenceType)
        .log("Relatedness", variable.Relatedness)
        .log("Sentence", variable.Sentence)
        .log("MatrixVerb", variable.MatrixVerb)
        .log("prob1", variable.prob1)
        .log("prob2", variable.prob2)
        .log("prob3", variable.prob3)
        .log("prob4", variable.prob4)
        .log("wait1", variable.wait1)
        .log("wait2", variable.wait2)
        .log("wait3", variable.wait3)
        .log("wait4", variable.wait4)
    ]
)

PennController("feedback",
    newText("feedback_instruction","If you have any feedback on the experiment, please leave it here.")
        .print()
    ,

    newTextInput("feedback", "")
        .log()
        .lines(0)
        .size(400, 200)
        .print()
    ,

    newButton("send", "Send")
        .settings.size(240,48)
        .settings.css("font-size", "2em")
        .center()
        .print()
        .wait()
)

// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial("bye" ,
    newText("Thank you for your participation! Please go to the following web page to verify your participation: <a href='https://app.prolific.co/submissions/complete?cc=BB30EE9E'> https://app.prolific.co/submissions/complete?cc=BB30EE9E</a>.")
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar" , false)
// Make sure the progress bar is full upon reaching this last (non-)trial
