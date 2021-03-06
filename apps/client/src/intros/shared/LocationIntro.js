import { Heading } from "@datapunt/asc-ui";
import React from "react";

import { ListItem, OrderedList } from "../../atoms";
import ListInsideOrderedList from "../../components/ListInsideOrderedList";

export default () => (
  <>
    <Heading forwardedAs="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>
        U voert op de volgende pagina eerst het adres van het gebouw in.
      </ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <ListInsideOrderedList variant="bullet">
          <ListItem>of het gebouw een monument is.</ListItem>
          <ListItem>
            of het gebouw in een beschermd stads- of dorpsgezicht ligt.
          </ListItem>
        </ListInsideOrderedList>
      </ListItem>
      <ListItem>Wij stellen u een aantal vragen over het gebouw.</ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten.</ListItem>
    </OrderedList>
  </>
);
