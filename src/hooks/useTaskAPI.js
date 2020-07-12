import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';

export const GET_ALL_TASKS = gql`
  query tasks {
    tasks {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;

export const CREATE_TASK_WITH_NEW_TAG = gql`
  mutation createTask($title: String, $tag: String) {
    insert_tasks_one(
      object: {
        title: $title
        task_tags: { data: { tag: { data: { name: $tag } } } }
      }
    ) {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK_WITH_EXISTING_TAG = gql`
  mutation createTask($title: String, $tag_id: Int) {
    insert_tasks_one(
      object: { title: $title, task_tags: { data: { tag_id: $tag_id } } }
    ) {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($title: String, $tag: String, $tag_id: Int) {
    insert_tasks_one(object: { title: $title }) {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    delete_tasks_by_pk(id: $id) {
      id
      title
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($id: Int!, $title: String) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($name: String) {
    insert_tags_one(object: { name: $name }) {
      id
      name
    }
  }
`;

const useTaskAPI = () => {
  const { loading: loadingAllTasks, error: errorAllTasks, data: dataAllTasks } = useQuery(
    GET_ALL_TASKS,
  );

  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    if (errorAllTasks) {
      console.log({ errorAllTasks, code: errorAllTasks.graphQLErrors[0].extensions.code });
    }
    if (
      errorAllTasks
      && (errorAllTasks.graphQLErrors[0].extensions.code === 'invalid-headers'
      || errorAllTasks.graphQLErrors[0].extensions.code === 'invalid-jwt')
    ) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [errorAllTasks, setAuthenticated]);

  const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(GET_ALL_TAGS);

  const [deleteTask, {
    loading: deleteTaskLoading,
    error: deleteTaskError,
  }] = useMutation(DELETE_TASK, {
    update: (cache, response) => {
      if (response.data) {
        const { tasks } = cache.readQuery({
          query: GET_ALL_TASKS,
        });
        cache.writeQuery({
          query: GET_ALL_TASKS,
          data: {
            tasks: tasks.filter(
              t => t.id !== response.data.delete_tasks_by_pk.id,
            ),
          },
        });
      }
    },
    onError: e => {
      console.log({ e });
    },
  });

  const [editTask, {
    loading: editTaskLoading,
    error: editTaskError,
    data: editTaskData,
  }] = useMutation(EDIT_TASK, {
    update: (cache, response) => {
      const { tasks } = cache.readQuery({
        query: GET_ALL_TASKS,
      });
      const indexOfTask = tasks.findIndex(
        t => t.id === response.data.update_tasks_by_pk.id,
      );
      const updatedTasks = tasks;
      updatedTasks.slice(indexOfTask, 1, response.data.update_tasks_by_pk);
      cache.writeQuery({
        query: GET_ALL_TASKS,
        data: {
          tasks: updatedTasks,
        },
      });
    },
    onError: e => {
      console.log({ e });
    },
  });

  const [createTask, {
    loading: createTaskLoading,
    error: createTaskError,
    data: createTaskData,
  }] = useMutation(CREATE_TASK, {
    update: (cache, response) => {
      const createdTask = {
        ...response.data.insert_tasks_one,
      };
      const { tasks } = cache.readQuery({
        query: GET_ALL_TASKS,
      });
      cache.writeQuery({
        query: GET_ALL_TASKS,
        data: {
          tasks: [...tasks, createdTask],
        },
      });
    },
    onCompleted: () => {},
    onError: () => {},
  });

  const [createTaskWithExistingTag, {
    loading: createTaskExistingTagLoading,
    error: createTaskExistingTagError,
    data: createTaskExistingData,
  }] = useMutation(
    CREATE_TASK_WITH_EXISTING_TAG,
    {
      update: (cache, response) => {
        const createdTask = {
          ...response.data.insert_tasks_one,
        };
        const { tasks } = cache.readQuery({
          query: GET_ALL_TASKS,
        });
        cache.writeQuery({
          query: GET_ALL_TASKS,
          data: {
            tasks: [...tasks, createdTask],
          },
        });
      },
      onCompleted: () => {
      },
      onError: () => {
      },
    },
  );

  const [createTag, {
    loading: createTagLoading,
    error: createTagError,
    data: createTagData,
  }] = useMutation(CREATE_TAG, {
    update: (cache, response) => {
      const { tags } = cache.readQuery({
        query: GET_ALL_TAGS,
      });
      cache.writeQuery({
        query: GET_ALL_TAGS,
        data: {
          tags: [...tags, response.data.insert_tags_one],
        },
      });
    },
    onError: e => {
      console.log({ e });
    },
  });

  return {
    tasks: dataAllTasks ? dataAllTasks.tasks : [],
    taskQueryStatus: {
      loading: loadingAllTasks,
      error: errorAllTasks,
    },
    tags: tagsData ? tagsData.tags : [],
    tagsQueryStatus: {
      loading: tagsLoading,
      error: tagsError,
    },
    deleteTask,
    deleteTaskStatus: {
      loading: deleteTaskLoading,
      error: deleteTaskError,
    },
    editTask,
    editTaskStatus: {
      loading: editTaskLoading,
      error: editTaskError,
      data: editTaskData,
    },
    createTask,
    createTaskStatus: {
      loading: createTaskLoading,
      error: createTaskError,
      data: createTaskData,
    },
    createTaskWithExistingTag,
    createTaskWithExistingTagStatus: {
      loading: createTaskExistingTagLoading,
      error: createTaskExistingTagError,
      data: createTaskExistingData,
    },
    createTag,
    createTagStatus: {
      loading: createTagLoading,
      error: createTagError,
      data: createTagData,
    },
    authenticated,
  };
};

export default useTaskAPI;
