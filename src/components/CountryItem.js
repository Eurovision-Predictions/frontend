import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ReactCountryFlag from "react-country-flag"

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemAvatar>
            <ReactCountryFlag countryCode={item.country_code} svg style={{ width: '2em', height: '2em' }} />
          </ListItemAvatar>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
