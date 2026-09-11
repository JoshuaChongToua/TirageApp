<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251125133839 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE demande (id INT AUTO_INCREMENT NOT NULL, demandeur_id INT DEFAULT NULL, receveur_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_2694D7A595A6EE59 (demandeur_id), INDEX IDX_2694D7A5B967E626 (receveur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE demande ADD CONSTRAINT FK_2694D7A595A6EE59 FOREIGN KEY (demandeur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE demande ADD CONSTRAINT FK_2694D7A5B967E626 FOREIGN KEY (receveur_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE demande DROP FOREIGN KEY FK_2694D7A595A6EE59');
        $this->addSql('ALTER TABLE demande DROP FOREIGN KEY FK_2694D7A5B967E626');
        $this->addSql('DROP TABLE demande');
    }
}
