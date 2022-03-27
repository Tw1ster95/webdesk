<?php
class Database
{
    private $conn;

    public function connect($host, $username, $password, $db_name)
    {
        $this->conn = null;

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $this->conn = new mysqli($host, $username, $password, $db_name);

            if ($this->conn->connect_error) {
                echo 'Error connecting to mysql db.';
            }
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $e) {
            echo 'Database Connection Error: ' . $e;
        }
    }

    public function get($options = array())
    {
        if (!isset($options['table'])) {
            echo 'Error: Database table not specified.';
            exit;
        }

        $qry = "SELECT * FROM " . $options['table'];

        if (isset($options['join']) && isset($options['joinon']))
            $qry = $qry . " LEFT JOIN " . $options['join'] . " ON " . $options['joinon'];

        if (isset($options['filter']))
            $qry = $qry . " WHERE " . $options['filter'];

        if (isset($options['order']))
            $qry = $qry . " ORDER BY " . $options['order'] . ' ' . (isset($options['ordertype']) ? $options['ordertype'] : 'ASC');

        if (isset($options['limit']))
            $qry = $qry . " LIMIT " . $options['limit'];

        return $this->conn->query($qry);
    }

    public function getcount($options = array())
    {
        if (!isset($options['table'])) {
            echo 'Error: Database table not specified.';
            exit;
        }

        $qry = "SELECT COUNT(*) FROM " . $options['table'];

        if (isset($options['join']) && isset($options['joinon']))
            $qry = $qry . " LEFT JOIN " . $options['join'] . " ON " . $options['joinon'];

        if (isset($options['filter']))
            $qry = $qry . " WHERE " . $options['filter'];

        $result = $this->conn->query($qry);
        return intval($result->fetch_assoc()['COUNT(*)']);
    }

    public function create($table, $tags, $values)
    {
        if (!isset($table) || !isset($tags) || !isset($values)) {
            echo 'Error: Table, tags, values and where are needed.';
            exit;
        }

        foreach ($values as &$val) {
            if (is_string($val))
                $val = "'" . $val . "'";
        }

        $qry = "INSERT INTO " . $table .
            " (" . implode(', ', $tags) . ") 
        VALUES (" . implode(', ', $values) . ")";

        return $this->conn->query($qry);
    }

    public function update($table, $tags, $values, $where_tag, $where_val)
    {
        if (!isset($table) || !isset($tags) || !isset($values) || !isset($where_tag) || !isset($where_val)) {
            echo 'Error: Table, tags, values where tag and where value are needed.';
            exit;
        }

        if (count($tags) !== count($values)) {
            echo 'Error: Tags and Values need to be same count.';
            exit;
        }

        $qry = "UPDATE " . $table . " SET ";
        $first = TRUE;
        for ($i = 0; $i < count($tags); $i++) {
            if (!$first)
                $qry = $qry . ", ";
            $first = FALSE;

            if (is_string($values[$i]))
                $qry = $qry . $tags[$i] . " = '" . $values[$i] . "'";
            else
                $qry = $qry . $tags[$i] . " = " . $values[$i];
        }

        $qry = $qry . " WHERE " . $where_tag . " = " . $where_val;

        return $this->conn->query($qry);
    }

    public function delete($table, $where = null)
    {
        if (!isset($table)) {
            echo 'Error: Table is needed.';
            exit;
        }

        $qry = "DELETE FROM " . $table;

        if ($where)
            $qry = $qry . " WHERE " . $where;

        return $this->conn->query($qry);
    }

    public function encodePassword($password)
    {
        return md5($password);
    }

    public function escape_string($string)
    {
        return $this->conn->real_escape_string($string);
    }

    public function getLastInsertedId()
    {
        return $this->conn->insert_id;
    }
}
