exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    facebookId: { type: 'varchar(40)', notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true },
    photo: { type: 'varchar(100)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createTable('groups', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    description: { type: 'varchar(300)', notNull: true },
    photo: { type: 'varchar(100)', notNull: true },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('groups', 'userId')

  pgm.createTable(
    'groupMembers',
    {
      groupId: {
        type: 'integer',
        notNull: true,
        references: '"groups"'
      },
      userId: {
        type: 'integer',
        notNull: true,
        references: '"users"'
      },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
      }
    },
    {
      constraints: {
        primaryKey: ['groupId', 'userId']
      }
    }
  )
  pgm.createIndex('groupMembers', 'groupId')

  pgm.createTable('tags', {
    id: 'id',
    tag: { type: 'varchar(100)', notNull: true },
    type: { type: 'varchar(100)', notNull: true }
  })

  pgm.createTable('items', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    description: { type: 'varchar(300)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('items', 'userId')

  pgm.createTable(
    'item_tags',
    {
      itemId: {
        type: 'integer',
        notNull: true,
        references: '"items"'
      },
      tagId: {
        type: 'integer',
        notNull: true,
        references: '"tags"'
      },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
      }
    },
    {
      constraints: {
        primaryKey: ['itemId', 'tagId']
      }
    }
  )
  pgm.createIndex('item_tags', 'itemId')

  pgm.createTable('item_images', {
    id: 'id',
    itemId: {
      type: 'integer',
      notNull: true,
      references: '"items"'
    },
    url: { type: 'varchar(100)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('item_images', 'itemId')

  pgm.sql(`
    INSERT INTO users("facebookId", "name", "email", "photo") 
    VALUES('10215954879920806', 'Viktor Eriksson', 'me@viktoreriksson.se', 
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO groups("userId", "name", "description", "photo")
    VALUES('1', 'Viktors group', 'A nice little group',
    'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO tags("tag", "type")
    VALUES ('Men', 'PERSON')`)

  pgm.sql(`
    INSERT INTO tags("tag", "type")
    VALUES ('Trousers', 'CLOTHING')`)

  pgm.sql(`
    INSERT INTO items("userId", "description")
    VALUES ('1', 'Viktors item')`)

  pgm.sql(`
    INSERT INTO item_tags("itemId", "tagId")
    VALUES ('1', '1'),('1', '2')
    `)

  pgm.sql(`
    INSERT INTO item_images("itemId", "url")
    VALUES('1', 'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)
}
