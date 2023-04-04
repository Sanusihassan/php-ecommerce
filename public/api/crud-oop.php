<?php
class DatabaseManager
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        // establish database connection
        global $connection;
        $dsn = 'mysql:host=localhost;dbname=store';
        $username = 'root';
        $password = '12345';
        $this->connection = $connection;
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // CREATE operation
    public function create($table, $data)
    {
        $stmt = $this->connection->prepare(
            "INSERT INTO $table (column1, column2) VALUES (:value1, :value2)"
        );
        $stmt->execute([
            'value1' => $data['value1'],
            'value2' => $data['value2'],
        ]);
        return $this->connection->lastInsertId();
    }

    // READ operation
    public function read($id)
    {
        $stmt = $this->connection->prepare(
            "SELECT * FROM mytable WHERE id = :id"
        );
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE operation
    public function update($table, $id, $data)
    {
        $stmt = $this->connection->prepare(
            "UPDATE $table SET column1 = :value1, column2 = :value2 WHERE id = :id"
        );
        return $stmt->execute([
            'id' => $id,
            'value1' => $data['value1'],
            'value2' => $data['value2'],
        ]);
    }

    // DELETE operation
    public function delete($id)
    {
        $stmt = $this->connection->prepare(
            "DELETE FROM mytable WHERE id = :id"
        );
        return $stmt->execute(['id' => $id]);
    }
}
$db = DatabaseManager::getInstance();
