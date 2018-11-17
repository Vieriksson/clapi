exports.up = pgm => {
  // ----- USERS -----
  pgm.sql(`
    INSERT INTO users(facebook_id, name, email, photo) 
    VALUES('10215954879920806', 'Viktor Eriksson', 'me@viktoreriksson.se', 
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO users(facebook_id, name, email, photo) 
    VALUES('1337', 'Test Testsson', 'test@test.se', 
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO groups(user_id, name, description, photo)
    VALUES('1', 'Viktors group', 'A nice little group',
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO groups(user_id, name, description, photo)
    VALUES('2', 'Tests group', 'A nice little test group',
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)
  // ----- ----- ----- -----

  // ----- GROUP MEMBERS -----
  pgm.sql(`INSERT INTO group_members(group_id, user_id) VALUES('1', '2')`)
  pgm.sql(`INSERT INTO group_members(group_id, user_id) VALUES('2', '1')`)
  // ----- ----- ----- -----

  // ----- ITEMS -----
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('1', 'Viktors item')`)
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('1', 'Viktors second item')`)
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('1', 'Viktors third item')`)
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('2', 'Tests item')`)
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('2', 'Tests second item')`)
  pgm.sql(`INSERT INTO items(user_id, description) VALUES ('2', 'Tests third item')`)
  // ----- ----- ----- -----

  // ----- TAGS -----
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('MEN', 'HUMAN')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('WOMEN', 'HUMAN')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('UNISEX', 'HUMAN')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('CHILDREN', 'HUMAN')`)

  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('44', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('46', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('48', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('50', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('52', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('54', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('56', 'SIZE')`)

  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('XSMALL', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('SMALL', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('MEDIUM', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('LARGE', 'SIZE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('XLARGE', 'SIZE')`)

  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('TROUSERS', 'TYPE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('OUTERWEAR', 'TYPE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('DRESSES', 'TYPE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('JACKETS', 'TYPE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('SUITS', 'TYPE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('SHOES', 'TYPE')`)

  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('CASUAL', 'STYLE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('FORMAL', 'STYLE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('SPREZZ', 'STYLE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('OUTDOOR', 'STYLE')`)
  pgm.sql(`INSERT INTO tags(tag, type) VALUES ('HIPSTER', 'STYLE')`)
  // ----- ----- ----- -----

  // ----- ITEM TAGS -----
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('1', 'MEN'),('1', '48'),('1','OUTERWEAR'),('1','SPREZZ')`
  )
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('2', 'MEN'),('2', '46'),('2','TROUSERS'),('2','CASUAL')`
  )
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('3', 'MEN'),('3', '46'),('3','JACKET'),('3','CASUAL')`
  )
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('4', 'MEN'),('4', '48'),('4','OUTERWEAR'),('4','CASUAL')`
  )
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('5', 'MEN'),('5', '46'),('5','JACKET'),('5','CASUAL')`
  )
  pgm.sql(
    `INSERT INTO item_tags(item_id, tag) VALUES ('6', 'MEN'),('6', '48'),('6','OUTERWEAR'),('6','CASUAL')`
  )
  // ----- ----- ----- -----

  // ----- ITEM IMAGES -----
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('1', 'https://c1.staticflickr.com/3/2805/33460549625_9851a4d266_b.jpg')`)
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('2', 'https://i.ebayimg.com/images/g/-pUAAOSwueNanTZM/s-l300.jpg')`)
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('3', 'https://i.ebayimg.com/images/g/lL0AAOSwCU1Y1uwC/s-l300.jpg')`)
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('4', 'https://ssli.ebayimg.com/images/g/WLwAAOSw1utaucoR/s-l640.jpg')`)
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('5', 'https://i.ebayimg.com/images/g/-pUAAOSwueNanTZM/s-l300.jpg')`)
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('6', 'https://c1.staticflickr.com/3/2805/33460549625_9851a4d266_b.jpg')`)
  // ----- ----- ----- -----

  // ----- GROUP ITEMS -----
  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('1', '1')`)
  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('1', '2')`)
  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('2', '4')`)
  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('2', '5')`)
  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('2', '6')`)
  // ----- ----- ----- -----
}
