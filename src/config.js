export default {
   serverUrl: 'http://data.discovery.cingulata.us',
   timeout: 5000,			// msec

   normalDotRadius: '5px',
   highlightDotRadius: '7.5px',

   textSizeStep: 0.04,
   minTextSize: 0.80,
   maxTextSize: 1.16,

   maxSinglePeriods: 15,		// Maximum single years/months to show in timeline

   searchMaxLength: 200,
   searchShowSearching: 10000,		// Number of search references before showing "Searching..." in status
   searchMaxWordLength: 25,		// Don't index "words" longer than this (cheap GUID-like exclusion)

   showViewHelp: false,			// show view help?
//   viewHelpCloseTime: 15,		// seconds before "auto-close" view help (0 --> no auto-close)
   viewHelpCloseTime: 5,		// seconds before "auto-close" view help (0 --> no auto-close)
   viewHelpCloseCountdown: false,	// true --> show countdown of remaining time before closing view help

   summaryViewMaxMRNChars: 8,

   timeWidgetThumbResetZone: 0.0035,	// Width of thumb "reset" zones in fraction of timeWidget width

   contentPanelDragUpdateInterval: 0,	// Msec between position updates during ContentPanel drag operations
   contentPanelUseWindowing: 150	// min number of displayable resources to use virtual/windowed display
}
