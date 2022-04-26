import { createMuiTheme } from "@material-ui/core/styles";

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f10041",
    },
    secondary: {
      main: "#07b85c",
    },
  },
  overrides: {
    MuiSlider: {
      root: {
        width: "70%",
        background: "transparent",
        border: "none",
      },
    },
    MuiSwitch: {
      switchBase: {
        color: "#c3c3c3",
      },
    },
    MuiCheckbox: {
      root: {
        color: "#c3c3c3",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#0b0d13",
      },
      dayDisabled: {
        color: "#f1004152",
      },
    },
    MuiDrawer: {
      paper: {
        width: "45%",
      },
    },
    MuiPaper: {
      root: {
        color: "#fff",
        backgroundColor: "#151920",
      },
    },
    PrivateSwitchBase: {
      root: {
        padding: "none",
      },
    },
    MuiAccordion: {
      root: {
        minHeight: "auto",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "0px 16px",
        minHeight: "auto",
        "&$expanded": {
          padding: "0px 16px",
          minHeight: "auto",
        },
      },
      content: {
        margin: "6px 0px",
        "&$expanded": {
          margin: "6px 0px",
          minHeight: "auto",
        },
      },
    },
    MuiButtonBase: {
      root: {
        padding: "0px",

        minHeight: "auto",
      },
    },
    MuiIconButton: {
      root: {
        padding: "none",
      },
    },
    MuiInput: {
      root: {
        color: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        lineHeight: "inherit",
        padding: "none",
      },
      underline: {
        "&::before": {
          borderBottom: "none",
        },
        "&::after": {
          borderBottom: "none",
        },
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#0b0b0e",
      },
    },
    MuiInputBase: {
      root: {
        color: "inherit",
      },
      input: {
        color: "inherit",
        textAlign: "center",
      },
    },
    MuiMobileStepper: {
      dot: {
        backgroundColor: "#64adad61",
        opacity: "0.5",
      },
      dotActive: {
        backgroundColor: "#01EB47",
        opacity: "1",
      },
      dots: {
        width: "50%",
        justifyContent: "space-evenly",
      },
    },
  },
});

export const datetimeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f10041",
    },
    secondary: {
      main: "#07b85c",
    },
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        color: "#c3c3c3",
      },
    },
    MuiCheckbox: {
      root: {
        color: "#c3c3c3",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        padding: "0px 10px",
      },
      dayLabel: {
        color: "#fff",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#fff",
      },
      dayDisabled: {
        color: "#4e4e4e70",
      },
    },
    MuiPaper: {
      root: {
        color: "#fff",
        backgroundColor: "#151920",
      },
    },
    PrivateSwitchBase: {
      root: {
        padding: "none",
      },
    },
    MuiAccordion: {
      root: {
        minHeight: "auto",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "0px 16px",
        minHeight: "auto",
        "&$expanded": {
          padding: "0px 16px",
          minHeight: "auto",
        },
      },
      content: {
        margin: "6px 0px",
        "&$expanded": {
          margin: "6px 0px",
          minHeight: "auto",
        },
      },
    },
    MuiButtonBase: {
      root: {
        padding: "0px",

        minHeight: "auto",
      },
    },
    MuiIconButton: {
      root: {
        padding: "none",
        "&:hover": {
          backgroundColor: "#ffffff !important",
        },
      },
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: "#fff",
      },
    },
    MuiPickersClock: {
      clock: {
        backgroundColor: "#21282f",
      },
    },
    MuiInput: {
      root: {
        color: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        lineHeight: "inherit",
        padding: "none",
      },
      underline: {
        "&::before": {
          borderBottom: "none",
        },
        "&::after": {
          borderBottom: "none",
        },
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#0b0b0e",
      },
    },
    MuiInputBase: {
      input: {
        textAlign: "center",
      },
    },
    MuiMobileStepper: {
      dot: {
        backgroundColor: "#64adad61",
        opacity: "0.5",
      },
      dotActive: {
        backgroundColor: "#01EB47",
        opacity: "1",
      },
      dots: {
        width: "50%",
        justifyContent: "space-evenly",
      },
    },
  },
});

export const denseDatetimeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f10041",
    },
    secondary: {
      main: "#07b85c",
    },
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        color: "#c3c3c3",
      },
    },
    MuiFormHelperText: {
      root: {
        position: "absolute",
        top: "95%",
        transform: "translateX(-50%)",
        left: "50%",
        color: "#f10041 !important",
        fontWeight: "700",
      },
    },
    MuiCheckbox: {
      root: {
        color: "#c3c3c3",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        padding: "0px 10px",
      },
      dayLabel: {
        color: "#fff",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#fff",
      },
      dayDisabled: {
        color: "#4e4e4e70",
      },
    },
    MuiPaper: {
      root: {
        color: "#fff",
        backgroundColor: "#151920",
      },
    },
    PrivateSwitchBase: {
      root: {
        padding: "none",
      },
    },
    MuiAccordion: {
      root: {
        minHeight: "auto",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "0px 16px",
        minHeight: "auto",
        "&$expanded": {
          padding: "0px 16px",
          minHeight: "auto",
        },
      },
      content: {
        margin: "6px 0px",
        "&$expanded": {
          margin: "6px 0px",
          minHeight: "auto",
        },
      },
    },
    MuiButtonBase: {
      root: {
        padding: "0px",

        minHeight: "auto",
      },
    },
    MuiIconButton: {
      root: {
        padding: "none",
        "&:hover": {
          backgroundColor: "#transparent !important",
        },
      },
    },
    MuiPickersClockNumber: {
      clockNumber: {
        color: "#fff",
      },
    },
    MuiPickersClock: {
      clock: {
        backgroundColor: "#21282f",
      },
    },
    MuiInput: {
      root: {
        color: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        lineHeight: "inherit",
        padding: "none",
      },
      underline: {
        "&::before": {
          borderBottom: "none",
        },
        "&::after": {
          borderBottom: "none",
        },
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#0b0b0e",
      },
    },
    MuiInputBase: {
      input: {
        textAlign: "center",
        padding: "4px 2px",
      },
    },
    MuiMobileStepper: {
      dot: {
        backgroundColor: "#64adad61",
        opacity: "0.5",
      },
      dotActive: {
        backgroundColor: "#01EB47",
        opacity: "1",
      },
      dots: {
        width: "50%",
        justifyContent: "space-evenly",
      },
    },
  },
});

export const selectTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #df003c",
        },
      },
    },
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiSelect: {
      root: {
        fontSize: "0.8rem",
        lineHeight: "1rem",
      },
      select: {
        "&:not([multiple]) option": {
          backgroundColor: "#21282f",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});

export const paperTableTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#1a1f27",
      },
    },
    MuiTable: {
      root: {
        color: "#fff",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid #0b0b0e",
      },
      head: {
        color: "#fff",
        fontSize: "0.775rem",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #df003c",
        },
      },
    },
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiSelect: {
      root: {
        fontSize: "0.8rem",
        lineHeight: "1rem",
      },
      select: {
        "&:not([multiple]) option": {
          backgroundColor: "#21282f",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});

export const tabsTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        width: "100%",
      },
      flexContainer: {
        justifyContent: "space-evenly",
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#f10041",
      },
    },
    MuiTab: {
      root: {
        color: "#fff",
        fontFamily: "inherit",
        padding: "4px 8px",
        minWidth: "65px",
      },
      textColorPrimary: {
        color: "#c8c8c8",
        "&$selected": {
          color: "#fff",
          fontWeight: 600,
        },
      },
    },
    MuiTable: {
      root: {
        color: "#fff",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid #0b0b0e",
      },
      head: {
        color: "#fff",
        fontSize: "0.775rem",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #df003c",
        },
      },
    },
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiSelect: {
      root: {
        fontSize: "0.8rem",
        lineHeight: "1rem",
      },
      select: {
        "&:not([multiple]) option": {
          backgroundColor: "#21282f",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});

export const denseTabsTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        width: "100%",
        minHeight: "none",
      },
      flexContainer: {
        justifyContent: "center",
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#f10041",
      },
    },
    MuiTab: {
      root: {
        fontSize: "0.75rem",
        fontWeight: "400",
        color: "#fff",
        fontFamily: "inherit",
        padding: "4px 4px",
        minWidth: "65px",
        minHeight: "none",
      },
      textColorPrimary: {
        color: "#c8c8c8",
        "&$selected": {
          color: "#fff",
          fontWeight: 600,
        },
      },
    },
    MuiTable: {
      root: {
        color: "#fff",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid #0b0b0e",
      },
      head: {
        color: "#fff",
        fontSize: "0.775rem",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #df003c",
        },
      },
    },
    MuiButtonBase: {
      root: {
        margin: "0px 16px !important",
      },
    },
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiSelect: {
      root: {
        fontSize: "0.8rem",
        lineHeight: "1rem",
      },
      select: {
        "&:not([multiple]) option": {
          backgroundColor: "#21282f",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});

export const dialogTheme = createMuiTheme({
  overrides: {
    PrivateSwitchBase: {
      root: {
        padding: "1px",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "none",
        flexGrow: "1",
      },
    },
    MuiDialog: {
      container: {
        width: "100vw",
      },
    },
  },
});

export const subTabsTheme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        width: "100%",
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#f10041",
      },
    },
    MuiTab: {
      root: {
        color: "#fff",
        fontSize: "0.7rem",
        fontFamily: "inherit",
        fontWeight: 400,
        padding: "4px 8px",
        minWidth: "65px",
      },
      textColorPrimary: {
        color: "#c8c8c8",
        "&$selected": {
          color: "#fff",
          fontWeight: 600,
        },
      },
    },
    MuiTable: {
      root: {
        color: "#fff",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid #0b0b0e",
      },
      head: {
        color: "#fff",
        fontSize: "0.775rem",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #df003c",
        },
      },
    },
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiSelect: {
      root: {
        fontSize: "0.8rem",
        lineHeight: "1rem",
      },
      select: {
        "&:not([multiple]) option": {
          backgroundColor: "#21282f",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});
