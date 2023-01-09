CREATE  TABLE "public".tb_m_users ( 
	user_id              varchar  NOT NULL  ,
	username             varchar(100)  NOT NULL  ,
	"password"           varchar  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	created_dt           timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	created_by           varchar DEFAULT 'SYSTEM'::character varying NOT NULL  ,
	updated_dt           timestamp DEFAULT CURRENT_TIMESTAMP   ,
	updated_by           varchar DEFAULT 'SYSTEM'::character varying   ,
	status               integer DEFAULT 1 NOT NULL  ,
	CONSTRAINT pk_tb_m_users PRIMARY KEY ( user_id )
 );

INSERT INTO "public".tb_m_users( user_id, username, "password", email, created_dt, created_by, updated_dt, updated_by, status ) VALUES ( '54dcc52f-cc9a-47c0-a4bc-688e03e6f3a9', 'coba', '$2a$08$HUVvep0kluk0MuTECMXqJ.I/u3PeEYMO44yJsuKB.yjYjnwLeuDAO', 'coba@gmail.com', '2023-01-09 11:32:02 AM', 'SYSTEM', '2023-01-09 06:51:18 PM', '54dcc52f-cc9a-47c0-a4bc-688e03e6f3a9', 1);
