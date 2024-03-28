-- create the users table
create table
  users (
    id uuid primary key default gen_random_uuid (),
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
  );

--create the product table
create table
  products (
    id uuid primary key default gen_random_uuid (),
    product_name varchar(255) not null,
    brand_name varchar(255) not null,
    image varchar(255),
    price numeric(5, 2) not null,
    document tsvector,
    category_id uuid,
    foreign key (category_id) references categories (id)
  );

-- create products trigger to add search document
CREATE FUNCTION trigger_function() 
  RETURNS trigger AS $$
  begin
      new.document := to_tsvector(new.product_name || ' ' || new.brand_name || ' ' || new.price);
      return new;
  end
  $$ language plpgsql;

create trigger set_ts_vector before insert or update on products for each row execute procedure trigger_function();


-- create orders table
create table
  orders (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null,
    created_at TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    constraint order_user_fk foreign key (user_id) references users (id)
  );

-- create order_items table
create table
  order_item (
    id uuid primary key default gen_random_uuid (),
    order_id uuid,
    product_id uuid,
    amount int not null default 1,
    foreign key (order_id) references orders (id),
    foreign key (product_id) references products (id)
  );

-- create categories table
create table
  categories (
    id uuid primary key default gen_random_uuid (),
    category_name varchar(255) not null
  );