const TodoModel = require("../models").Todo;

async function getAllTask(req, res) {
  try {
    const todos = await TodoModel.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
}

async function getDetailTask(req, res) {
  try {
    const { todoId } = req.params;
    const todo = await TodoModel.findOne({ where: { id: Number(todoId) } });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
}

async function postTask(req, res) {
  try {
    const { title, description, startTime } = req.body;

    // Pengecekan apakah input tidak boleh kosong
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }
    const newTodoData = {
      title: title,
      description: description,
      startTime: startTime,
      status: "false",
    };

    const newTodo = await TodoModel.create(newTodoData);

    res.status(201).json({
      message: "new todo created",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }L
}

async function updateTask(req, res) {
  try {
    const { todoId } = req.params;
    const { title, description, status } = req.body;

    const updateTodoData = {
      title: title,
      description: description,
      status: status
    };

    // Update data todo di database menggunakan Sequelize
    const updatedTodo = await TodoModel.update(updateTodoData, {
      where: {
        id: todoId
      }
    });

    // Periksa apakah ada baris yang diperbarui
    if (updatedTodo[0] === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}


async function deleteTask(req, res){
  try {
    const {todoId} = req.params

    await TodoModel.destroy({
      where: {
        id: todoId
      }
    })
    res.status(200).json({
      message: 'delete todo sucess'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'internal server error'
    })
  }
}

module.exports = {
  getAllTask,
  getDetailTask,
  postTask,
  updateTask,
  deleteTask
};
