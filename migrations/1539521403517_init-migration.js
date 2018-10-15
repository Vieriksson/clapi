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
    'tags',
    {
      tag: { type: 'varchar(100)', notNull: true },
      type: { type: 'varchar(100)', notNull: true }
    },
    {
      constraints: {
        primaryKey: ['tag', 'type']
      }
    }
  )

  pgm.createTable('items', {
    id: 'id',
    description: { type: 'varchar(300)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  pgm.createTable('images', {
    id: 'id',
    url: { type: 'varchar(100)', notNull: true },
    itemId: {
      type: 'integer',
      notNull: true,
      references: '"items"'
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('images', 'itemId')
}
