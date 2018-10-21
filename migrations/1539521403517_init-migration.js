exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    facebook_id: { type: 'varchar(40)', notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true },
    photo: { type: 'varchar(100)', notNull: true },
    created_at: {
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
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('groups', 'user_id')

  pgm.createTable('items', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    description: { type: 'varchar(300)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('items', 'user_id')

  pgm.createTable('tags', {
    id: 'id',
    tag: { type: 'varchar(100)', notNull: true },
    type: { type: 'varchar(100)', notNull: true }
  })

  pgm.createTable(
    'group_members',
    {
      group_id: {
        type: 'integer',
        notNull: true,
        references: '"groups"'
      },
      user_id: {
        type: 'integer',
        notNull: true,
        references: '"users"'
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
      }
    },
    {
      constraints: {
        primaryKey: ['group_id', 'user_id']
      }
    }
  )
  pgm.createIndex('group_members', 'group_id')
  pgm.createIndex('group_members', 'user_id')

  pgm.createTable(
    'group_items',
    {
      group_id: {
        type: 'integer',
        notNull: true,
        references: '"groups"'
      },
      item_id: {
        type: 'integer',
        notNull: true,
        references: '"users"'
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
      }
    },
    {
      constraints: {
        primaryKey: ['group_id', 'item_id']
      }
    }
  )
  pgm.createIndex('group_items', 'group_id')

  pgm.createTable(
    'item_tags',
    {
      item_id: {
        type: 'integer',
        notNull: true,
        references: '"items"'
      },
      tag_id: {
        type: 'integer',
        notNull: true,
        references: '"tags"'
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp')
      }
    },
    {
      constraints: {
        primaryKey: ['item_id', 'tag_id']
      }
    }
  )
  pgm.createIndex('item_tags', 'item_id')

  pgm.createTable('item_images', {
    id: 'id',
    item_id: {
      type: 'integer',
      notNull: true,
      references: '"items"'
    },
    url: { type: 'varchar(100)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('item_images', 'item_id')

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

  pgm.sql(`
    INSERT INTO group_members(group_id, user_id)
    VALUES('1', '2')`)

  pgm.sql(`
    INSERT INTO group_members(group_id, user_id)
    VALUES('2', '1')`)

  pgm.sql(`
    INSERT INTO tags(tag, type)
    VALUES ('Men', 'PERSON')`)

  pgm.sql(`
    INSERT INTO tags(tag, type)
    VALUES ('Trousers', 'CLOTHING')`)

  pgm.sql(`
    INSERT INTO items(user_id, description)
    VALUES ('1', 'Viktors item')`)

  pgm.sql(`
    INSERT INTO items(user_id, description)
    VALUES ('2', 'Tests item')`)

  pgm.sql(`
    INSERT INTO item_tags(item_id, tag_id)
    VALUES ('1', '1'),('1', '2')
    `)

  pgm.sql(`
    INSERT INTO item_tags(item_id, tag_id)
    VALUES ('2', '1'),('2', '2')
    `)

  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('1', 'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)
  1
  pgm.sql(`
    INSERT INTO item_images("item_id", "url")
    VALUES('2', 'https://graph.facebook.com/v2.6/10215954879920806/picture?type=large')`)

  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('1', '1')`)

  pgm.sql(`
    INSERT INTO group_items(group_id, item_id)
    VALUES('2', '1')`)
}
