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
        references: '"items"'
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
      tag: {
        type: 'varchar(100)',
        notNull: true
      }
    },
    {
      constraints: {
        primaryKey: ['item_id', 'tag']
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
}
