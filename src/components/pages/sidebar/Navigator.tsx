import React, { useState, useCallback, useEffect, useMemo } from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";

type Props = {
    onchange?: (index: number) => void;
} & DrawerProps;

export default function Navigator(props: Props) {
  const { onchange, ...other } = props;

  const [disableIndex, setDisabledIndex] = useState(0);
  const [disabledList, setDisabledList] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const changeIndex = useCallback(
    (v: number) => {
      setDisabledIndex(v);
    },
    [disableIndex, disabledList]
  );

  const categories = [
    {
      id: "graph",
      children: [
        {
          id: "気温グラフ",
          icon: <DnsRoundedIcon />,
          active: disabledList[0],
        },
        {
          id: "風速",
          icon: <PermMediaOutlinedIcon />,
          active: disabledList[1],
        },
        { id: "降水量",
          icon: <PublicIcon />,
          active: disabledList[2]
        },
        {
          id: "体感気温",
          icon: <SettingsEthernetIcon />,
          active: disabledList[3],
        },
        {
          id: "最高気温",
          icon: <SettingsInputComponentIcon />,
          active: disabledList[4],
        },
        {
          id: "最高気温＆最低気温",
          icon: <SettingsInputComponentIcon />,
          active: disabledList[5],
        },
      ],
    },
  ];

  const item = {
    py: "2px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
      bgcolor: "rgba(255, 255, 255, 0.08)",
    },
  };

  const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
  };



  useEffect(() => {
    setDisabledList((prev) => {
      return prev.map((disabled, i) => {
        return disabled = i === disableIndex ? true : false;
      });
    });
    setDisabledList(
      disabledList.map((disabled, i) => disabled = i === disableIndex ? true : false)
    );
  }, [disableIndex]);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          weather graph
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>

            {children.map(({ id: childId, icon, active }, i) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => {
                    changeIndex(i);
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
