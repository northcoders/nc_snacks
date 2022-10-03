# NC snacks

We're making an api to keep track of all the tasty treats that the northcoders eat throughout the day. Some setup has been done to write a seed script to populate the database and your task is to create the first end point.

## GET /api/snacks

This endpoint will respond with and array containing all of the snack objects from the database.

The body of the response that you send from your server to the client should be structured like this:

```json
{
  "snacks": [
    {
      "snack_id": 1,
      "snack_name": "Kit Kat",
      "flavour_text": "time for a break"
    },
    {
      "snack_id": 2,
      "snack_name": "Hobnob",
      "flavour_text": "a modern classic"
    }
  ]
}
```
