import React from 'react';
import { Container, Typography, Box, List, ListItem, Paper } from '@mui/material';

export default function Hero() {
  return (
    <Container maxWidth="md" component={Paper} elevation={3} sx={{ padding: 4, marginTop: 4 }}>
      <Box>
        <Typography variant="body1" paragraph>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus.
        </Typography>
        <Typography variant="body1" paragraph>
          Eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
          earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1">Temporibus autem</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">Quibusdam et aut officiis debitis</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">Aut rerum necessitatibus saepe</Typography>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
