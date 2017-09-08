var mongoose    = require("mongoose");
var DreamLog  = require("./models/dreamlog");

var data        = [
    {
    userID:                             "testID",
    dreamDate:                          "2017-07-12",
    dreamNumber:                        "1",
    dreamAudioURL:                      "http://drive.google.com",
    easeOfGoingToSleep:                 "4",
    dreamKeywords:                      "tudatos, repülés",
    bodyPosition:                       "hanyatt",
    bodyPositionChange:                 "oldalra",
    firstThought:                       "Húbazmeg",
    feelingAmenity:                     "8",
    dreamDetail:                        "6",
    dreamTitle:                         "Megvilágosodás",
    dreamTitleJustification:            "Azért mert az úgy volt hogy..",
    numberOfDreams:                     "2",
    dreamsAreRelated:                   "true",
    dreamSelfActive:                    "true",
    dreamEmphasis:                      "4",
    dreamMemoryVividness:               "5",
    dreamEffectOnSelf:                  "Felemelő",
    dreamLog:                           "És akkor elmentem az erdőbe és találkoztam a..",
    dreamLogMainCharacter:              "A szörny megkergette Balázst, de csak mert tetszett neki",
    relatedToReality:                   "true",
    dreamSymbols:                       "négylevelű lóhere, hatszög, kerekeskút",
    childhoodImages:                    "false",
    returningSymbolsOrPlaces:           "true",
    dreamIsRequested:                   "false",
    dreamCategory:                      "ingerálom",
    affectedAreasOfConstiousReality:    "emésztés a munkahelyen",
    futureOrPastHints:                  "false",
    Consciousness:                      "5",
    SelfEmphasis:                       "7",
    FeelingSensation:                   "6",
    MeaningSolution:                    "3",
    ActivePassive:                      "3"
    
    },
    {
    userID:                             "testID",
    dreamDate:                          "2017-07-12",
    dreamNumber:                        "2",
    dreamAudioURL:                      "http://drive.google.com",
    easeOfGoingToSleep:                 "4",
    dreamKeywords:                      "szex szex szex",
    bodyPosition:                       "hanyatt",
    bodyPositionChange:                 "oldalra",
    firstThought:                       "Húbazmeg",
    feelingAmenity:                     "8",
    dreamDetail:                        "6",
    dreamTitle:                         "Repülés",
    dreamTitleJustification:            "Azért mert az úgy volt hogy..",
    numberOfDreams:                     "2",
    dreamsAreRelated:                   "true",
    dreamSelfActive:                    "true",
    dreamEmphasis:                      "4",
    dreamMemoryVividness:               "5",
    dreamEffectOnSelf:                  "Felemelő",
    dreamLog:                           "És akkor elmentem az erdőbe és találkoztam a..",
    dreamLogMainCharacter:              "A szörny megkergette Balázst, de csak mert tetszett neki",
    relatedToReality:                   "true",
    dreamSymbols:                       "négylevelű lóhere, hatszög, kerekeskút",
    childhoodImages:                    "false",
    returningSymbolsOrPlaces:           "true",
    dreamIsRequested:                   "false",
    dreamCategory:                      "ingerálom",
    affectedAreasOfConstiousReality:    "emésztés a munkahelyen",
    futureOrPastHints:                  "false",
    Consciousness:                      "10",
    SelfEmphasis:                       "1",
    FeelingSensation:                   "8",
    MeaningSolution:                    "9",
    ActivePassive:                      "10"
    }
    ];




function seedDB() {
//Clear dreamlogs from DB
    DreamLog.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed dreamlogs!");
            
            //Add dreamlogs
                // data.forEach(function(seed){
                //     DreamLog.create(seed, function(err, dreamlog){
                //         if(err){
                //             console.log(err);
                //         } else {
                //             console.log("Added a dreamlog");
                //         }
                //     });
                // });
        }
    });
}

    
module.exports = seedDB;