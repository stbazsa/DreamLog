var mongoose = require("mongoose");
// Dreamlog schema setup
var dreamlogSchema = new mongoose.Schema({
    userID:                             String,
    dreamDate:                          { type: Date, default: Date.now },
    dreamNumber:                        { type: Number, min: 1, max: 50 },
    AudioURLs:                          [String],
    dreamTitle:                         String,
    Consciousness:                      { type: Number, min: 1, max: 100 },
    SelfEmphasis:                       { type: Number, min: 1, max: 100 },
    FeelingSensation:                   { type: Number, min: 1, max: 100 },
    MeaningSolution:                    { type: Number, min: 1, max: 100 },
    ActivePassive:                      { type: Number, min: 1, max: 100 },
    dreamSymbols:                       [String],
    dreamCategory:                      [String],
    
    
    easeOfGoingToSleep:                 Number,
    bodyPosition:                       String,
    bodyPositionChange:                 String,
    firstThought:                       String,
    feelingAmenity:                     { type: Number, min: 1, max: 10 },
    dreamDetail:                        { type: Number, min: 1, max: 10 },
    
    
    dreamTitleJustification:            String,
    numberOfDreams:                     { type: Number, min: 1, max: 50 },
    dreamsAreRelated:                   Boolean,
    dreamSelfActive:                    Boolean,
    dreamEmphasis:                      { type: Number, min: 1, max: 10 },
    dreamMemoryVividness:               { type: Number, min: 1, max: 10 },
    dreamEffectOnSelf:                  String,
    dreamLog:                           String,
    dreamLogMainCharacter:              String,
    relatedToReality:                   Boolean,
    
    childhoodImages:                    Boolean,
    returningSymbolsOrPlaces:           Boolean,
    dreamIsRequested:                   Boolean,
    affectedAreasOfConstiousReality:    String,
    futureOrPastHints:                  Boolean
    
    
    
});

module.exports = mongoose.model("DreamLog", dreamlogSchema);