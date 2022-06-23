-- CREATE DATABASE dethithu;
-- CREATE SCHEMA mock;
-- DROP TABLE mock.users CASCADE;
-- DROP TABLE mock.quest_kho CASCADE;
-- DROP TABLE mock.de CASCADE;
-- DROP TABLE mock.quest_thongke CASCADE;
-- DROP TABLE mock.ans_kho CASCADE;
-- DROP TABLE mock.ans_thongke CASCADE;

CREATE TABLE mock.users(
	user_id serial UNIQUE PRIMARY KEY,
	user_name varchar(20) UNIQUE,
	password varchar(20),
	role varchar(20)
);
CREATE TABLE mock.quest_kho(
	quest_kho_id serial UNIQUE PRIMARY KEY,
	created_id int,
	quest_kho_content varchar(50),
	FOREIGN KEY (created_id) References mock.users(user_id)
);
CREATE TABLE mock.ans_kho(
	quest_kho_id int,
	ans_kho_id serial PRIMARY KEY,
	created_id int,
	ans_kho_content varchar(50),
	isCorrect boolean,
	FOREIGN KEY (quest_kho_id) References mock.quest_kho(quest_kho_id)
);
CREATE TABLE mock.de(
	de_so serial PRIMARY KEY,
	mo_ta_de varchar(50),
	created_id int,
	time_start timestamp,
	time_end timestamp,
	FOREIGN KEY (created_id) References mock.users(user_id)
);
CREATE TABLE mock.quest_thongke(
	ma_cau_hoi serial PRIMARY KEY,
	de_so int,
	quest_kho_id int,
	FOREIGN KEY (quest_kho_id) References mock.quest_kho(quest_kho_id),
	FOREIGN KEY (de_so) References mock.de(de_so)
);

CREATE TABLE mock.ans_thongke(
	ma_tra_loi serial PRIMARY KEY,
	user_id int,
	de_so int,
	quest_kho_id int,
	ans_kho_id int,
	created_id int,
	time_start timestamp,
	time_end timestamp,
	ans_cham boolean,
	FOREIGN KEY (user_id) References mock.users(user_id),
	FOREIGN KEY (de_so) References mock.de(de_so),
	FOREIGN KEY (quest_kho_id) References mock.quest_kho(quest_kho_id),
	FOREIGN KEY (ans_kho_id) References mock.ans_kho(ans_kho_id),
	FOREIGN KEY (created_id) References mock.users(user_id)
);

-- ===========================================================
INSERT INTO mock.users(user_name,password,role)
VALUES
	('hunguser','1234','user'),
	('hungadmin','1234','admin'),
	('hunguser1','1234','user'),
	('hungadmin1','1234','admin');

INSERT INTO mock.quest_kho(created_id,quest_kho_content)
VALUES
	(2,'Thực hiện phép tính 1 + 1 ='),
	(2,'Thực hiện phép tính 5 - 1 ='),
	(2,'Thực hiện phép tính 7 + 1 - 3 ='),
	(2,'Thực hiện phép tính 9 - 4 ='),
	(2,'Thực hiện phép tính 10 - 2 + 3 ='),
	(2,'Thực hiện phép tính 2 + 2 + 2 ='),
	(2,'Thực hiện phép tính 3 + 3 + 3 ='),
	(2,'Thực hiện phép tính 4 + 4 + 6 ='),
	(2,'Thực hiện phép tính 2 + 8 - 5 ='),
	(2,'Thực hiện phép tính 1 + 2 + 3 =');

INSERT INTO mock.ans_kho(created_id,quest_kho_id,ans_kho_content,iscorrect)
VALUES
	(2,1,'A. 2','1'),
	(2,1,'B. 3','0'),
	(2,2,'A. 4','1'),
	(2,2,'B. 3','0'),
	(2,3,'A. 5','1'),
	(2,3,'B. 3','0'),
	(2,4,'A. 5','1'),
	(2,4,'B. 3','0'),
	(2,5,'A. 11','1'),
	(2,5,'B. 3','0'),
	(2,6,'A. 6','1'),
	(2,6,'B. 3','0'),
	(2,7,'A. 9','1'),
	(2,7,'B. 3','0'),
	(2,8,'A. 14','1'),
	(2,8,'B. 3','0'),
	(2,9,'A. 5','1'),
	(2,9,'B. 3','0'),
	(2,10,'A. 6','1'),
	(2,10,'B. 3','0');

INSERT INTO mock.de(mo_ta_de,created_id,time_start,time_end)
VALUES
	('Kiểm tra 15 phút, môn Toán',2,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677'),
	('Kiểm tra 45 phút, môn Toán Hình học',2,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677'),
	('Kiểm tra 45 phút, môn Toán Đại số',4,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677'),
	('Kiểm tra 15 phút, môn Toán Đại số',4,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677');

INSERT INTO mock.quest_thongke(de_so,quest_kho_id)
VALUES
	(1,2),
	(1,5),
	(1,3),
	(2,1),
	(2,5),
	(2,3);

INSERT INTO mock.ans_thongke(created_id,user_id,de_so,quest_kho_id,ans_kho_id,time_start,time_end,ans_cham)
VALUES
	(2,1,1,2,3,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677','true'),
	(2,1,1,5,9,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677','true'),
	(2,1,1,3,5,'2016-07-07 17:01:18.410677','2016-07-07 17:44:18.410677','true');
	
-- ===========================================================
CREATE OR REPLACE FUNCTION getAllkhoAdmin()
RETURNS TABLE(
	quest_kho_id int,created_id int, quest_kho_content varchar(50), ans_kho_content varchar(50), iscorrect boolean
)
AS
$$
BEGIN
	RETURN QUERY
		SELECT quest_kho.quest_kho_id,quest_kho.created_id,quest_kho.quest_kho_content,ans_kho.ans_kho_content,ans_kho.iscorrect 
		FROM mock.ans_kho, mock.quest_kho 
		WHERE ans_kho.quest_kho_id = quest_kho.quest_kho_id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getAllkhoAdmin()

CREATE OR REPLACE FUNCTION getkhoById(id int)
RETURNS TABLE(
	quest_kho_id int,created_id int, quest_kho_content varchar(50), ans_kho_content varchar(50), ans_kho_id int
)
AS
$$
BEGIN
	RETURN QUERY
		SELECT quest_kho.quest_kho_id,quest_kho.created_id,quest_kho.quest_kho_content,ans_kho.ans_kho_content,ans_kho.ans_kho_id 
		FROM mock.ans_kho, mock.quest_kho 
		WHERE ans_kho.quest_kho_id = quest_kho.quest_kho_id
		AND quest_kho.quest_kho_id = id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getkhoById(1)

CREATE OR REPLACE FUNCTION getdeById(id int)
RETURNS TABLE(
	de_so int, mo_ta_de varchar(50), created_id int, time_start timestamp, time_end timestamp, quest_kho_id int
)
AS
$$
BEGIN
	RETURN QUERY
		SELECT de.de_so,de.mo_ta_de,de.created_id,de.time_start,de.time_end,quest_thongke.quest_kho_id
		FROM mock.de, mock.quest_thongke 
		WHERE de.de_so = quest_thongke.de_so
		AND de.de_so = id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getdeById(1)

CREATE OR REPLACE FUNCTION getUserByde(id int)
RETURNS TABLE(
	user_id int
)
AS
$$
BEGIN
	RETURN QUERY
		SELECT ans_thongke.user_id FROM mock.ans_thongke
		WHERE ans_thongke.de_so = id
		GROUP BY ans_thongke.user_id;
END;
$$ LANGUAGE plpgsql;
	
-- SELECT * FROM getUserByde(1)

CREATE OR REPLACE FUNCTION getbailamById(id int, uid int)
RETURNS TABLE(
	de_so int, user_id int, time_start timestamp, time_end timestamp, quest_kho_id int, ans_kho_id int, created_id int, ans_cham boolean
)
AS
$$
BEGIN
	RETURN QUERY
		SELECT ans_thongke.de_so, ans_thongke.user_id, ans_thongke.time_start, ans_thongke.time_end, ans_thongke.quest_kho_id, ans_thongke.ans_kho_id, ans_thongke.created_id, ans_thongke.ans_cham
		FROM mock.ans_thongke
		WHERE ans_thongke.de_so = id AND ans_thongke.user_id = uid;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getbailamById(1,1)