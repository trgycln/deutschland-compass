-- literary_work_listens tablosundaki UNIQUE constraints'i kontrol et
-- Eğer (work_id, user_identifier) UNIQUE'i varsa kaldır

-- İlk kontrol et
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'literary_work_listens' AND constraint_type = 'UNIQUE';

-- Eğer UNIQUE constraint varsa kaldır (Common names):
ALTER TABLE literary_work_listens DROP CONSTRAINT IF EXISTS literary_work_listens_work_id_user_identifier_key;
ALTER TABLE literary_work_listens DROP CONSTRAINT IF EXISTS unique_work_user_listen;

-- Şimdi herhangi bir sayıda record insert edilebilecek
-- Kontrol et
SELECT COUNT(*) as total_listens FROM literary_work_listens;
